import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingDown, DollarSign, Zap, Target, ArrowDown, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeRange] = useState('7d');

  // Mock data
  const stats = [
    {
      title: 'Items Tracked',
      value: '12',
      change: '+2',
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Active Alerts',
      value: '3',
      change: '0',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10'
    },
    {
      title: 'Total Saved',
      value: '$234.50',
      change: '+$45.20',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Price Drops',
      value: '5',
      change: 'Today',
      icon: TrendingDown,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10'
    }
  ];

  const priceDrops = [
    {
      id: 1,
      name: 'Sony WH-1000XM5 Headphones',
      currentPrice: '$299.99',
      previousPrice: '$349.99',
      discount: '14%',
      time: '2 hours ago',
      image: '🎧'
    },
    {
      id: 2,
      name: 'Apple AirPods Pro Max',
      currentPrice: '$549.99',
      previousPrice: '$649.00',
      discount: '15%',
      time: '4 hours ago',
      image: '🎵'
    },
    {
      id: 3,
      name: 'Samsung 55" 4K Smart TV',
      currentPrice: '$599.99',
      previousPrice: '$799.99',
      discount: '25%',
      time: '1 day ago',
      image: '📺'
    },
    {
      id: 4,
      name: 'MacBook Air M2 13"',
      currentPrice: '$1,099.99',
      previousPrice: '$1,199.99',
      discount: '8%',
      time: '2 days ago',
      image: '💻'
    }
  ];

  const chartData = [
    { date: 'Mon', saved: 10 },
    { date: 'Tue', saved: 25 },
    { date: 'Wed', saved: 40 },
    { date: 'Thu', saved: 55 },
    { date: 'Fri', saved: 85 },
    { date: 'Sat', saved: 120 },
    { date: 'Sun', saved: 234.5 }
  ];

  const alerts = [
    {
      id: 1,
      text: 'Your tracked Apple AirPods Pro just dropped 15%',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      text: 'Price alert for Samsung TV - New low price detected',
      time: '4 hours ago',
      unread: false
    },
    {
      id: 3,
      text: 'You saved $45.20 this week on your tracked items',
      time: '1 day ago',
      unread: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-400">Here's what's happening with your prices today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-dark-card border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-black/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                  <span className="text-xs font-semibold text-green-500">+{stat.change}</span>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Price Drops */}
          <div className="lg:col-span-2 bg-dark-card border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-primary" />
                Recent Price Drops
              </h2>
              <button
                onClick={() => navigate('/search')}
                className="text-primary text-sm hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-4">
              {priceDrops.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-all cursor-pointer border border-gray-800/50"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-3xl">{item.image}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.currentPrice}</p>
                      <p className="text-xs text-gray-400 line-through">{item.previousPrice}</p>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                      <ArrowDown className="w-3 h-3" />
                      {item.discount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alerts */}
          <div className="bg-dark-card border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-yellow-500" />
              Alerts
            </h2>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-all ${
                    alert.unread
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-gray-900/50 border-gray-800/50'
                  }`}
                >
                  <p className={`text-sm ${alert.unread ? 'text-primary font-medium' : 'text-gray-300'}`}>
                    {alert.text}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">{alert.time}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/alerts')}
              className="w-full mt-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-all"
            >
              View all alerts
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-dark-card border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Savings Trend</h2>
            <p className="text-gray-400 text-sm">Total amount saved over the last 7 days</p>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Saved']}
                />
                <Line
                  type="monotone"
                  dataKey="saved"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
