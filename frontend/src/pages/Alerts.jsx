import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Edit, Trash2, Play, Pause, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../i18n/translations';
import { FAKE_PRODUCTS } from '../data/fakeProducts';

const fakeAlerts = [
  {
    id: 1,
    productId: 5,
    productName: 'iPhone 15 Pro 256GB',
    targetPrice: 899.00,
    currentPrice: 999.99,
    lowestEver: 949.99,
    store: 'Any Store',
    notifyBy: 'email',
    createdAt: '2026-03-15',
    status: 'active',
    progress: 70,
  },
  {
    id: 2,
    productId: 6,
    productName: 'MacBook Air M2 13 inch',
    targetPrice: 1099.99,
    currentPrice: 1099.99,
    lowestEver: 999.99,
    store: 'Amazon',
    notifyBy: 'both',
    createdAt: '2026-03-20',
    status: 'triggered',
    progress: 100,
  },
  {
    id: 3,
    productId: 1,
    productName: 'Sony WH-1000XM5 Headphones',
    targetPrice: 249.99,
    currentPrice: 279.99,
    lowestEver: 249.99,
    store: 'Amazon',
    notifyBy: 'sms',
    createdAt: '2026-04-01',
    status: 'active',
    progress: 85,
  },
  {
    id: 4,
    productId: 3,
    productName: 'Apple AirPods Pro 2nd Gen',
    targetPrice: 179.99,
    currentPrice: 189.99,
    lowestEver: 179.99,
    store: 'Any Store',
    notifyBy: 'email',
    createdAt: '2026-04-05',
    status: 'active',
    progress: 91,
  },
  {
    id: 5,
    productId: 2,
    productName: 'Samsung 55 inch 4K QLED TV',
    targetPrice: 449.99,
    currentPrice: 549.99,
    lowestEver: 449.99,
    store: 'Walmart',
    notifyBy: 'email',
    createdAt: '2026-04-10',
    status: 'paused',
    progress: 45,
  },
];

export default function Alerts() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState(fakeAlerts);
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredAlerts = alerts.filter(
    (alert) => filterStatus === 'all' || alert.status === filterStatus
  );

  const handleDelete = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
    setDeleteConfirm(null);
  };

  const handleTogglePause = (id) => {
    setAlerts(
      alerts.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'paused' ? 'active' : 'paused' }
          : a
      )
    );
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 60) return 'bg-primary';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getStatusBadgeColor = (status) => {
    if (status === 'active') return 'bg-blue-500/10 text-blue-400';
    if (status === 'triggered') return 'bg-green-500/10 text-green-400 animate-pulse';
    if (status === 'paused') return 'bg-gray-500/10 text-gray-400';
  };

  const getNotifyIcon = (notifyBy) => {
    if (notifyBy === 'email') return '📧';
    if (notifyBy === 'sms') return '📱';
    return '📧📱';
  };

  const activeAlerts = alerts.filter((a) => a.status === 'active').length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Price Alerts</h1>
        <p className="text-gray-400">Get notified the moment prices drop</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-dark-card border border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Active Alerts</p>
          <p className="text-2xl font-bold text-primary">{activeAlerts}</p>
        </div>
        <div className="bg-dark-card border border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Free Plan Limit</p>
          <p className="text-2xl font-bold text-white">{activeAlerts}/5</p>
        </div>
        <div className="bg-dark-card border border-gray-700 rounded-lg p-4">
          <button className="w-full px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
            Add New Alert
          </button>
        </div>
      </div>

      {/* Upgrade Banner */}
      {activeAlerts >= 3 && (
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-400 mb-1">
                You are using {activeAlerts}/{5} free alerts
              </p>
              <p className="text-sm text-gray-400 mb-3">
                Upgrade to Pro for unlimited alerts + SMS notifications
              </p>
            </div>
            <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition-all text-sm flex-shrink-0">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { label: 'All Alerts', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'Triggered', value: 'triggered' },
          { label: 'Paused', value: 'paused' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterStatus(tab.value)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
              filterStatus === tab.value
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <div className="bg-dark-card border border-gray-700 rounded-xl p-12 text-center">
          <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-white mb-2">No alerts yet</h3>
          <p className="text-gray-400 mb-6">
            Start tracking products and set your target price
          </p>
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-dark-card border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={() =>
                        navigate(`/product/${alert.productId}`)
                      }
                      className="text-white font-semibold hover:text-primary transition-colors truncate"
                    >
                      {alert.productName}
                    </button>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${getStatusBadgeColor(
                        alert.status
                      )}`}
                    >
                      {alert.status.charAt(0).toUpperCase() +
                        alert.status.slice(1)}
                    </span>
                  </div>

                  {/* Store & Notify */}
                  <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">Store:</span>
                      <span className="text-sm text-white font-medium">
                        {alert.store}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">Notify:</span>
                      <span className="text-lg">{getNotifyIcon(alert.notifyBy)}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Created {alert.createdAt}
                    </span>
                  </div>

                  {/* Price Info */}
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Target Price</p>
                      <p className="text-sm font-semibold text-white">
                        ${alert.targetPrice.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Current Price</p>
                      <p className="text-sm font-semibold text-white">
                        ${alert.currentPrice.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">To Go</p>
                      <p
                        className={`text-sm font-semibold ${
                          alert.currentPrice > alert.targetPrice
                            ? 'text-red-400'
                            : 'text-green-400'
                        }`}
                      >
                        ${Math.abs(
                          alert.currentPrice - alert.targetPrice
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-1">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getProgressColor(
                          alert.progress
                        )}`}
                        style={{ width: `${alert.progress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {alert.progress}% of the way there
                  </p>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleTogglePause(alert.id)}
                    className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
                  >
                    {alert.status === 'paused' ? (
                      <Play className="w-4 h-4" />
                    ) : (
                      <Pause className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(alert.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Delete Confirmation */}
                {deleteConfirm === alert.id && (
                  <div className="absolute right-6 bg-dark-card border border-red-500/30 rounded-lg p-3 shadow-lg z-10">
                    <p className="text-xs text-white mb-2">
                      Delete this alert?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(alert.id)}
                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-all"
                      >
                        Yes, delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs font-medium transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
