import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || '';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState(null);
  const popupCheckRef = useRef(null);
  const googleScriptLoaded = useRef(false);
  const navigate = useNavigate();
  const { login, socialLogin, completeSocialAuth, user, token } = useContext(AuthContext);

  useEffect(() => {
    if (token || user) {
      navigate(user?.role === 'doctor' ? '/dashboard/doctor' : '/dashboard/patient');
      return;
    }

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!googleClientId || googleScriptLoaded.current) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      googleScriptLoaded.current = true;
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [navigate, token, user]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type !== 'social-auth') {
        return;
      }

      const payload = event.data.payload;
      if (popupCheckRef.current) {
        window.clearInterval(popupCheckRef.current);
        popupCheckRef.current = null;
      }
      setIsSocialLoading(false);
      setActiveProvider(null);

      const result = completeSocialAuth(payload);
      if (result.success) {
        if (result.user.role === 'doctor') {
          navigate('/dashboard/doctor');
        } else {
          navigate('/dashboard/patient');
        }
      } else {
        setError(result.error || 'Social login failed');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      if (popupCheckRef.current) {
        window.clearInterval(popupCheckRef.current);
      }
    };
  }, [completeSocialAuth, navigate, token, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      if (res.user.role === 'doctor') {
        navigate('/dashboard/doctor');
      } else {
        navigate('/dashboard/patient');
      }
    } else {
      setError(res.error || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setActiveProvider('google');
    setIsSocialLoading(true);

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!googleClientId) {
      setIsSocialLoading(false);
      setActiveProvider(null);
      setError('Google sign-in is not configured yet. Add your Google client ID to the frontend environment.');
      return;
    }

    if (!window.google?.accounts?.id) {
      setIsSocialLoading(false);
      setActiveProvider(null);
      setError('Google sign-in script is still loading. Please try again in a moment.');
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (response) => {
          const res = await fetch(`${API_URL}/api/v1/auth/social/google/credential`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential })
          });

          const data = await res.json();
          const result = completeSocialAuth(data);

          if (result.success) {
            if (result.user.role === 'doctor') {
              navigate('/dashboard/doctor');
            } else {
              navigate('/dashboard/patient');
            }
          } else {
            setError(result.error || 'Google sign-in failed');
            setIsSocialLoading(false);
            setActiveProvider(null);
          }
        }
      });

      window.google.accounts.id.prompt();
    } catch (err) {
      setIsSocialLoading(false);
      setActiveProvider(null);
      setError('Google sign-in could not be started.');
    }
  };

  const handleSocialLogin = async (provider) => {
    if (provider === 'google') {
      await handleGoogleLogin();
      return;
    }

    setError('');
    setActiveProvider(provider);
    setIsSocialLoading(true);

    const res = await socialLogin(provider);
    if (!res.success) {
      setIsSocialLoading(false);
      setActiveProvider(null);
      setError(res.error || 'Unable to start social sign-in');
      return;
    }

    const popup = window.open(
      res.authUrl,
      `${provider}-oauth`,
      'width=500,height=700,top=120,left=120,scrollbars=yes'
    );

    if (!popup) {
      setIsSocialLoading(false);
      setActiveProvider(null);
      setError('Please allow popups to continue with your account.');
      return;
    }

    if (popupCheckRef.current) {
      window.clearInterval(popupCheckRef.current);
    }

    popupCheckRef.current = window.setInterval(() => {
      if (popup.closed) {
        window.clearInterval(popupCheckRef.current);
        popupCheckRef.current = null;
        setIsSocialLoading(false);
        setActiveProvider(null);
      }
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-muted/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Activity className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Register here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-card py-8 px-4 shadow-xl border sm:rounded-2xl sm:px-10">
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border bg-background border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border bg-background border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-md shadow-sm bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors"
                disabled={isSocialLoading && activeProvider === 'google'}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                <span>{isSocialLoading && activeProvider === 'google' ? 'Opening…' : 'Google'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('microsoft')}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-md shadow-sm bg-background text-sm font-medium text-foreground hover:bg-muted transition-colors"
                disabled={isSocialLoading && activeProvider === 'microsoft'}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                </svg>
                <span>{isSocialLoading && activeProvider === 'microsoft' ? 'Opening…' : 'Microsoft'}</span>
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Google sign-in uses your Google account directly once the Google client ID is configured in the frontend environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
