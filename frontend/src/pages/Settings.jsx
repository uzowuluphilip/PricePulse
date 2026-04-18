import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';
import {
  Lock,
  User,
  Bell,
  Globe,
  Shield,
  CreditCard,
  Trash2,
  Upload,
  Eye,
  EyeOff,
  Check,
  ToggleLeft,
  ToggleRight,
  Clock,
  AlertTriangle,
  LogOut,
  Smartphone,
} from 'lucide-react';

export default function Settings() {
  const { user, logout } = useAuth();
  const { currentLang } = useLanguage();

  // Profile settings
  const [profileData, setProfileData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushAlerts: true,
    weeklyReport: true,
    aiRecommendations: true,
  });

  // Alert preferences
  const [alertPrefs, setAlertPrefs] = useState({
    notifyMethod: 'email',
    frequency: 'instantly',
    threshold: 5,
  });

  // Settings
  const [settings, setSettings] = useState({
    currency: 'USD',
    timezone: 'UTC',
  });

  // Security
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Delete account
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'NGN', 'CAD', 'AUD', 'JPY'];
  const timezones = [
    'UTC',
    'EST',
    'CST',
    'MST',
    'PST',
    'GMT',
    'CET',
    'IST',
    'JST',
    'AEST',
  ];

  const activeSessions = [
    {
      id: 1,
      device: 'MacBook Pro',
      location: 'San Francisco, CA',
      lastActive: 'Just now',
      current: true,
    },
    {
      id: 2,
      device: 'iPhone 15',
      location: 'Oakland, CA',
      lastActive: '2 hours ago',
      current: false,
    },
  ];

  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your profile and preferences</p>
      </div>

      {/* ========== PROFILE SECTION ========== */}
      <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Profile Settings
        </h2>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </div>
            <button className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Photo
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* Save Button */}
          <button className="px-6 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2">
            <Check className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* ========== NOTIFICATION SETTINGS ========== */}
      <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notification Settings
        </h2>

        <div className="space-y-4">
          {/* Email Alerts */}
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <p className="font-medium text-white">Email Alerts</p>
              <p className="text-sm text-gray-400">Get notified via email</p>
            </div>
            <button
              onClick={() => handleToggle('emailAlerts')}
              className="transition-all"
            >
              {notifications.emailAlerts ? (
                <ToggleRight className="w-6 h-6 text-green-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* SMS Alerts - Pro only */}
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <p className="font-medium text-white flex items-center gap-2">
                SMS Alerts
                {user?.plan === 'free' && (
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded font-medium">
                    Pro
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-400">Get notified via SMS</p>
            </div>
            <button
              onClick={() => {
                if (user?.plan === 'free') return;
                handleToggle('smsAlerts');
              }}
              disabled={user?.plan === 'free'}
              className="transition-all disabled:opacity-50"
            >
              {notifications.smsAlerts ? (
                <ToggleRight className="w-6 h-6 text-green-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Browser Push */}
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <p className="font-medium text-white">Browser Push Notifications</p>
              <p className="text-sm text-gray-400">Get desktop notifications</p>
            </div>
            <button
              onClick={() => handleToggle('pushAlerts')}
              className="transition-all"
            >
              {notifications.pushAlerts ? (
                <ToggleRight className="w-6 h-6 text-green-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Weekly Report */}
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <p className="font-medium text-white">Weekly Price Report</p>
              <p className="text-sm text-gray-400">Email report every Sunday</p>
            </div>
            <button
              onClick={() => handleToggle('weeklyReport')}
              className="transition-all"
            >
              {notifications.weeklyReport ? (
                <ToggleRight className="w-6 h-6 text-green-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* AI Recommendations */}
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <p className="font-medium text-white">AI Deal Recommendations</p>
              <p className="text-sm text-gray-400">Get AI-powered deal suggestions</p>
            </div>
            <button
              onClick={() => handleToggle('aiRecommendations')}
              className="transition-all"
            >
              {notifications.aiRecommendations ? (
                <ToggleRight className="w-6 h-6 text-green-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========== ALERT PREFERENCES ========== */}
      <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          Alert Preferences
        </h2>

        <div className="space-y-6">
          {/* Notification Method */}
          <div>
            <p className="font-medium text-white mb-3">Default Notification Method</p>
            <div className="flex gap-4">
              {['email', 'sms', 'both'].map((method) => (
                <label key={method} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="notifyMethod"
                    value={method}
                    checked={alertPrefs.notifyMethod === method}
                    onChange={(e) =>
                      setAlertPrefs({ ...alertPrefs, notifyMethod: e.target.value })
                    }
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-gray-300 capitalize">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Alert Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Alert Frequency
            </label>
            <select
              value={alertPrefs.frequency}
              onChange={(e) =>
                setAlertPrefs({ ...alertPrefs, frequency: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition-all"
            >
              <option value="instantly">Instantly</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* Price Drop Threshold */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-300">
                Price Drop Threshold
              </label>
              <span className="text-lg font-bold text-primary">{alertPrefs.threshold}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={alertPrefs.threshold}
              onChange={(e) =>
                setAlertPrefs({ ...alertPrefs, threshold: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-2">
              Alert me when price drops by at least {alertPrefs.threshold}%
            </p>
          </div>
        </div>
      </div>

      {/* ========== LANGUAGE & REGION ========== */}
      <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Language & Region
        </h2>

        <div className="space-y-6">
          {/* Language Switcher */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <LanguageSwitcher />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) =>
                setSettings({ ...settings, currency: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition-all"
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) =>
                setSettings({ ...settings, timezone: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition-all"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ========== SECURITY ========== */}
      <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Security
        </h2>

        <div className="space-y-6">
          {/* Change Password */}
          <div className="pb-6 border-b border-gray-700">
            <h3 className="font-medium text-white mb-4">Change Password</h3>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-all"
                  />
                  <button
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <button className="px-6 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
                Save Password
              </button>
            </div>
          </div>

          {/* Two Factor Authentication */}
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <p className="font-medium text-white">Two Factor Authentication</p>
              <p className="text-sm text-gray-400">Add extra security to your account</p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className="transition-all"
            >
              {twoFactorEnabled ? (
                <ToggleRight className="w-6 h-6 text-green-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Active Sessions */}
          <div className="pt-6 border-t border-gray-700">
            <h3 className="font-medium text-white mb-4">Active Sessions</h3>
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div key={session.id} className="p-4 bg-gray-900/50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-white flex items-center gap-2">
                        {session.device}
                        {session.current && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-medium">
                            This device
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className="px-3 py-1 text-sm text-red-400 hover:bg-red-500/10 rounded transition-all">
                      Logout
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== PLAN & BILLING ========== */}
      <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Plan & Billing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Plan */}
          <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-lg">Current Plan</h3>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full font-medium uppercase">
                {user?.plan}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-400 mb-6">
              <p>✓ 5 active alerts</p>
              <p>✓ 7-day price history</p>
              <p>✓ Basic search</p>
              <p>✗ SMS notifications</p>
              <p>✗ Weekly reports</p>
            </div>
            <p className="text-xs text-gray-500">Free forever plan</p>
          </div>

          {/* Pro Plan (Upgrade) */}
          <div className="p-6 rounded-lg border border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-lg">Pro Plan</h3>
              <span className="px-3 py-1 bg-primary text-white text-xs rounded-full font-medium">
                $9/month
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-300 mb-6">
              <p>✓ Unlimited alerts</p>
              <p>✓ Full price history</p>
              <p>✓ Advanced search</p>
              <p>✓ SMS notifications</p>
              <p>✓ Weekly reports</p>
              <p>✓ AI recommendations</p>
            </div>
            <button className="w-full px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* ========== DANGER ZONE ========== */}
      <div className="bg-dark-card border border-red-900/50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Danger Zone
        </h2>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-6 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500/10 rounded-lg font-medium transition-all"
        >
          Delete Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-card border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-2">Delete Account?</h3>
            <p className="text-gray-400 mb-4">
              This action cannot be undone. All your data will be permanently deleted.
            </p>

            <p className="text-sm text-gray-300 mb-4">
              Type <span className="font-mono font-bold">DELETE</span> to confirm:
            </p>

            <input
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="Type DELETE"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-all mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirm('');
                }}
                className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all"
              >
                Cancel
              </button>
              <button
                disabled={deleteConfirm !== 'DELETE'}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
