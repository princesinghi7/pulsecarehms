import React, { useContext, useEffect, useRef, useState } from 'react';
import { User, Bell, Shield } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { user, updateProfile, updatePassword, deleteAccount, logout } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'notifications' ? 'notifications' : 'profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    dob: user?.dob || ''
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      dob: user?.dob || ''
    });
    setAvatarPreview(user?.avatar || '');
  }, [user]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'notifications') {
      setActiveTab('notifications');
    } else if (tab === 'security') {
      setActiveTab('security');
    } else {
      setActiveTab('profile');
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const next = new URLSearchParams(searchParams);
    if (tab === 'profile') {
      next.delete('tab');
    } else {
      next.set('tab', tab);
    }
    setSearchParams(next);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result;
      setAvatarPreview(preview);
      setFormData((prev) => ({ ...prev, avatar: preview }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    const result = await updateProfile({
      id: user?.id,
      email: user?.email,
      ...formData,
      avatar: formData.avatar || avatarPreview
    });

    if (result.success) {
      setMessage('Profile updated successfully.');
    } else {
      setMessage(result.error || 'Unable to update profile.');
    }
    setIsSaving(false);
  };

  const handlePasswordUpdate = async () => {
    setPasswordLoading(true);
    setMessage('');
    const result = await updatePassword({
      id: user?.id,
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
      confirmPassword: passwordForm.confirmPassword
    });

    if (result.success) {
      setMessage(result.message || 'Password updated successfully.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setMessage(result.error || 'Unable to update password.');
    }
    setPasswordLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('This will permanently delete your account. Continue?')) {
      return;
    }

    setDeleteLoading(true);
    setMessage('');
    const result = await deleteAccount(passwordForm.currentPassword);

    if (result.success) {
      setMessage(result.message || 'Account deleted successfully.');
      logout();
      window.location.href = '/login';
    } else {
      setMessage(result.error || 'Unable to delete account.');
    }
    setDeleteLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-1">
          <button 
            onClick={() => handleTabChange('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <User className="h-5 w-5" /> Profile
          </button>
          <button 
            onClick={() => handleTabChange('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <Bell className="h-5 w-5" /> Notifications
          </button>
          <button 
            onClick={() => handleTabChange('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <Shield className="h-5 w-5" /> Security
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card border rounded-xl shadow-sm p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-semibold border-b pb-4">Profile Information</h2>
              
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile preview" className="h-full w-full object-cover" />
                  ) : (
                    user?.name ? user.name.charAt(0).toUpperCase() : 'U'
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarSelect} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors">Choose Profile Photo</button>
                  <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP up to 5MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input type="text" name="name" className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input type="email" className="w-full p-2.5 rounded-md border bg-muted focus:outline-none" value={user?.email || ''} disabled />
                  <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input type="tel" name="phone" className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 0199" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <input type="date" name="dob" className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" value={formData.dob} onChange={handleChange} />
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-3">
                {message && <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                <button type="button" onClick={handleSave} disabled={isSaving} className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-60">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-semibold border-b pb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { title: 'Appointment Reminders', desc: 'Receive SMS and Email reminders 24 hours before your visit.' },
                  { title: 'Lab Results', desc: 'Get notified immediately when new lab results are available.' },
                  { title: 'Marketing Emails', desc: 'Receive hospital news and promotional offers.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i !== 2} />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-lg font-semibold border-b pb-4">Security Settings</h2>
              
              <div className="space-y-4 max-w-md">
                {message && <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <input type="password" name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange} className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <input type="password" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <input type="password" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <button type="button" onClick={handlePasswordUpdate} disabled={passwordLoading} className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:bg-primary/90 mt-2 disabled:opacity-60">
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>

              <div className="pt-8 border-t">
                 <h3 className="text-red-600 font-medium mb-2">Danger Zone</h3>
                 <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                 <button type="button" onClick={handleDeleteAccount} disabled={deleteLoading} className="border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/10 dark:hover:bg-red-900/20 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-60">
                  {deleteLoading ? 'Deleting...' : 'Delete Account'}
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
