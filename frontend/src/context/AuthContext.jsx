import React, { createContext, useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from local storage', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, [token]);

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const persistAuth = (authData) => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
    return { success: true, user: authData.user };
  };

  const login = async (email, password) => {
    try {
      clearAuth();

      const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        return persistAuth(data);
      }

      clearAuth();
      return { success: false, error: data.error || 'Email not found or password is incorrect' };
    } catch (error) {
      clearAuth();
      return { success: false, error: 'Server error during login' };
    }
  };

  const register = async (userData) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (data.success) {
        return persistAuth(data);
      }

      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: 'Server error during registration' };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (data.success) {
        return persistAuth(data);
      }

      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: 'Server error while updating profile' };
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      });
      const data = await res.json();

      if (data.success) {
        return { success: true, message: data.message };
      }

      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: 'Server error while updating password' };
    }
  };

  const deleteAccount = async (password) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/account`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user?.id || user?._id, password }),
      });
      const data = await res.json();

      if (data.success) {
        logout();
        return { success: true, message: data.message };
      }

      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: 'Server error while deleting account' };
    }
  };

  const socialLogin = async (provider) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/social/${provider}/url`);
      const contentType = res.headers.get('content-type') || '';
      let data = null;

      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { error: text || 'Unable to start social sign-in' };
      }

      if (res.ok && data.success) {
        return { success: true, authUrl: data.authUrl };
      }

      return { success: false, error: data.error || `Unable to start social sign-in (${res.status})` };
    } catch (error) {
      return { success: false, error: 'Unable to start social sign-in' };
    }
  };

  const completeSocialAuth = (payload) => {
    if (!payload?.success) {
      return { success: false, error: payload?.error || 'Social login failed' };
    }

    return persistAuth(payload);
  };

  const logout = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, updateProfile, updatePassword, deleteAccount, socialLogin, completeSocialAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
