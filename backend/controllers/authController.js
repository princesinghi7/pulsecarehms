const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
  expiresIn: process.env.JWT_EXPIRE || '30d'
});

const buildUserPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  dob: user.dob,
  avatar: user.avatar,
  provider: user.provider
});

const normalizeEmail = (value) => (value || '').trim().toLowerCase();

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');

// Helper to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = createToken(user);

  res.status(statusCode).json({
    success: true,
    token,
    user: buildUserPayload(user)
  });
};

const sendPopupResponse = (res, payload) => {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Social login</title>
  </head>
  <body>
    <script>
      const payload = ${JSON.stringify(payload)};
      if (window.opener) {
        window.opener.postMessage({ type: 'social-auth', payload }, window.location.origin || '*');
      }
      window.close();
    </script>
  </body>
</html>`;

  res.send(html);
};

const getProviderConfig = (provider) => {
  switch (provider) {
    case 'google':
      return {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_REDIRECT_URI || `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/v1/auth/social/google/callback`,
        authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo'
      };
    case 'microsoft':
      return {
        clientId: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        redirectUri: process.env.MICROSOFT_REDIRECT_URI || `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/v1/auth/social/microsoft/callback`,
        authorizeUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        userInfoUrl: 'https://graph.microsoft.com/oidc/userinfo'
      };
    default:
      return null;
  }
};

const buildSocialAuthUrl = (provider) => {
  const config = getProviderConfig(provider);

  if (!config) {
    throw new Error('Unsupported provider');
  }

  if (!config.clientId || !config.clientSecret) {
    if (provider === 'google') {
      return 'https://accounts.google.com/AccountChooser';
    }

    if (provider === 'microsoft') {
      return 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?prompt=select_account';
    }
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: provider === 'google' ? 'openid email profile' : 'openid profile email'
  });

  if (provider === 'google') {
    params.set('access_type', 'offline');
    params.set('prompt', 'select_account');
  } else {
    params.set('prompt', 'select_account');
  }

  return `${config.authorizeUrl}?${params.toString()}`;
};

const exchangeCodeForToken = async (provider, code) => {
  const config = getProviderConfig(provider);
  const body = new URLSearchParams({
    code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: config.redirectUri,
    grant_type: 'authorization_code'
  });

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || data.error || 'Token exchange failed');
  }

  return data;
};

const getProviderUserInfo = async (provider, accessToken) => {
  const config = getProviderConfig(provider);
  const response = await fetch(config.userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || data.error || 'Failed to get user profile');
  }

  return {
    providerId: data.sub || data.id,
    email: data.email,
    name: data.name || data.given_name || data.preferred_username || data.email?.split('@')[0],
    picture: data.picture || data.avatar_url || ''
  };
};

const verifyGoogleCredential = async (credential) => {
  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
  const data = await response.json();

  if (!response.ok || !data.email || data.email_verified !== 'true') {
    throw new Error('Google sign-in could not be verified');
  }

  const expectedAudience = process.env.GOOGLE_CLIENT_ID;
  if (expectedAudience && data.aud && data.aud !== expectedAudience) {
    throw new Error('Google sign-in was issued for a different client');
  }

  return {
    providerId: data.sub,
    email: data.email,
    name: data.name || data.given_name || data.email?.split('@')[0],
    picture: data.picture || ''
  };
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const normalizedEmail = normalizeEmail(email);

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ success: false, error: 'Please provide a name, email, and password' });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
    }

    const normalizedRole = ['patient', 'doctor', 'admin', 'receptionist', 'pharmacist', 'lab_technician'].includes(role)
      ? role
      : 'patient';

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'An account with this email already exists' });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: normalizedRole,
      phone
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res.status(400).json({ success: false, error: 'Please provide your registered email and password' });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ success: false, error: 'Please use your registered email address to sign in' });
    }

    const user = await User.findOne({ email: normalizedEmail, provider: 'local' }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Email not found or password is incorrect' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Email not found or password is incorrect' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getSocialAuthUrl = async (req, res) => {
  try {
    const authUrl = buildSocialAuthUrl(req.params.provider);
    res.json({ success: true, authUrl });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.googleCredentialLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ success: false, error: 'Google credential is missing' });
    }

    const profile = await verifyGoogleCredential(credential);

    let user = await User.findOne({ email: normalizeEmail(profile.email) });

    if (!user) {
      user = await User.create({
        name: profile.name,
        email: normalizeEmail(profile.email),
        password: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        provider: 'google',
        providerId: profile.providerId,
        avatar: profile.picture
      });
    } else {
      user.provider = user.provider || 'google';
      user.providerId = user.providerId || profile.providerId;
      if (profile.picture) {
        user.avatar = profile.picture;
      }
      await user.save();
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id, email, name, phone, dob, avatar } = req.body;

    let user = null;
    if (id) {
      user = await User.findById(id);
    } else if (email) {
      user = await User.findOne({ email: normalizeEmail(email) });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (dob !== undefined) user.dob = dob;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { id, currentPassword, newPassword, confirmPassword } = req.body;

    if (!id || !currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, error: 'Please provide your current password and a new password' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters long' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, error: 'New passwords do not match' });
    }

    const user = await User.findById(id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ success: false, error: 'Please provide your password to delete your account' });
    }

    const user = await User.findById(id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Password is incorrect' });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Account deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.socialAuthCallback = async (req, res) => {
  try {
    const { provider } = req.params;
    const { code, error, error_description } = req.query;

    if (error) {
      return sendPopupResponse(res, { success: false, error: error_description || error });
    }

    if (!code) {
      return sendPopupResponse(res, { success: false, error: 'No authorization code was returned by the provider.' });
    }

    const tokenResponse = await exchangeCodeForToken(provider, code);
    const profile = await getProviderUserInfo(provider, tokenResponse.access_token);

    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = await User.create({
        name: profile.name,
        email: profile.email,
        password: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        provider,
        providerId: profile.providerId,
        avatar: profile.picture
      });
    } else {
      user.provider = user.provider || provider;
      user.providerId = user.providerId || profile.providerId;
      if (profile.picture) {
        user.avatar = profile.picture;
      }
      await user.save();
    }

    const token = createToken(user);
    sendPopupResponse(res, {
      success: true,
      token,
      user: buildUserPayload(user)
    });
  } catch (err) {
    sendPopupResponse(res, { success: false, error: err.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    // req.user should be set by protect middleware
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
