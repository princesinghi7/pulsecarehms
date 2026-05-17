import React, { useContext, useState } from 'react';
import { User, Bell, Shield, Key } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

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
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <User className="h-5 w-5" /> Profile
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <Bell className="h-5 w-5" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('security')}
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
                <div className="h-20 w-20 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <button className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors">Change Avatar</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input type="text" className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input type="email" className="w-full p-2.5 rounded-md border bg-muted focus:outline-none" defaultValue={user?.email} disabled />
                  <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input type="tel" className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" defaultValue="+1 (555) 0199" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <input type="date" className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" defaultValue="1990-01-01" />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:bg-primary/90">Save Changes</button>
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <input type="password" className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <input type="password" className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <input type="password" className="w-full p-2.5 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium hover:bg-primary/90 mt-2">Update Password</button>
              </div>

              <div className="pt-8 border-t">
                 <h3 className="text-red-600 font-medium mb-2">Danger Zone</h3>
                 <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                 <button className="border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/10 dark:hover:bg-red-900/20 px-4 py-2 rounded-md text-sm font-medium transition-colors">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
