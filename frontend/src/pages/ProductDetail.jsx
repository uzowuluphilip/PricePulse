import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bell, Heart, Star, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { FAKE_PRODUCTS } from '../data/fakeProducts';
import api from '../services/api.js';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id);
  
  const product = FAKE_PRODUCTS.find(p => p.id === productId);
  
  const [timeFilter, setTimeFilter] = useState('all');
  const [priceAlert, setPriceAlert] = useState('');
  const [alertMethod, setAlertMethod] = useState(['Email', 'SMS']);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [predLoading, setPredLoading] = useState(false);

  const fetchPrediction = async () => {
    if (!productId) return;
    setPredLoading(true);
    try {
      const res = await api.post(`/ai/predict/${productId}`);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error('Prediction error:', err);
    } finally {
      setPredLoading(false);
    }
  };

  useEffect(() => {
    if (product) {
      fetchPrediction();
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-white mb-2">Product not found</h1>
        <p className="text-gray-400 mb-6">This product doesn't exist in our database</p>
        <button
          onClick={() => navigate('/search')}
          className="px-6 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0];
  const highestPrice = sortedPrices[sortedPrices.length - 1];
  const savingsAmount = product.highestEver - lowestPrice.price;

  const getDealRecommendation = () => {
    if (product.dealScore >= 8) {
      return { text: 'Buy Now — Excellent time to purchase', color: 'text-green-400' };
    } else if (product.dealScore >= 6) {
      return { text: 'Good Deal — Price is below average', color: 'text-blue-400' };
    }
    return { text: 'Wait — Better price expected soon', color: 'text-yellow-400' };
  };

  const filteredHistory = useMemo(() => {
    if (timeFilter === '1m') {
      return product.priceHistory.slice(-1);
    } else if (timeFilter === '3m') {
      return product.priceHistory.slice(-3);
    } else if (timeFilter === '6m') {
      return product.priceHistory.slice(-6);
    }
    return product.priceHistory;
  }, [timeFilter, product.priceHistory]);

  const recommendation = getDealRecommendation();
  const categoryColor = {
    'Electronics': '#ef4444',
    'Fashion': '#f97316',
    'Computers': '#3b82f6',
    'Home': '#8b5cf6',
    'Sports': '#10b981',
  }[product.category] || '#3b82f6';

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex gap-2 text-sm text-gray-400 mb-8">
        <button onClick={() => navigate('/')} className="hover:text-primary transition-all">Home</button>
        <span>/</span>
        <button onClick={() => navigate('/search')} className="hover:text-primary transition-all">Search</button>
        <span>/</span>
        <span className="text-white line-clamp-1">{product.name}</span>
      </div>

      {/* Product Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div
          className="h-80 rounded-xl flex items-center justify-center text-6xl relative"
          style={{
            backgroundImage: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}88 100%)`,
          }}
        />

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-6">{product.name}</h1>
          <p className="text-gray-400 text-lg mb-8">{product.description}</p>

          {/* Deal Score Circle */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-primary flex flex-col items-center justify-center bg-blue-500/10">
              <span className="text-3xl font-bold text-primary">{product.dealScore}</span>
              <span className="text-xs text-gray-400">/10</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">AI Deal Score</p>
              <p className="text-lg font-semibold text-white mt-2">
                {product.dealScore >= 8.5 ? 'Excellent' : product.dealScore >= 7 ? 'Very Good' : 'Good'} Deal
              </p>
            </div>
          </div>

          {/* Best Price */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-400">Best Price</p>
            <p className="text-3xl font-bold text-green-400 mt-2">
              ${lowestPrice.price.toFixed(2)} on {lowestPrice.store}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Save ${savingsAmount.toFixed(2)} vs highest price
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowAlertForm(!showAlertForm)}
              className="flex-1 px-4 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Bell className="w-5 h-5" />
              Set Price Alert
            </button>
            <button className="flex-1 px-4 py-3 border-2 border-primary text-primary hover:bg-primary/10 rounded-lg font-medium flex items-center justify-center gap-2 transition-all">
              <Heart className="w-5 h-5" />
              Track This
            </button>
          </div>
        </div>
      </div>

      {/* Price Comparison Table */}
      <div className="bg-dark-card border border-gray-800 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Compare Prices Across Stores</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Store</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Price</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Rating</th>
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedPrices.map((price, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-700/50 ${idx === 0 ? 'border-l-4 border-l-green-500 bg-green-500/5' : ''}`}
                >
                  <td className="px-4 py-4 text-white font-medium">{price.store}</td>
                  <td className={`px-4 py-4 font-bold ${idx === 0 ? 'text-green-400 text-lg' : 'text-white'}`}>
                    ${price.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        price.inStock
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {price.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-white flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {price.rating} ({price.reviews.toLocaleString()})
                  </td>
                  <td className="px-4 py-4">
                    <button className="px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg text-sm font-medium transition-all">
                      Go to Store →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price History Chart */}
      <div className="bg-dark-card border border-gray-800 rounded-lg p-6 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Price History
          </h2>
          <div className="flex gap-2">
            {['1m', '3m', '6m', 'all'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  timeFilter === filter
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {filter === 'all' ? 'All' : filter.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredHistory}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="date"
                stroke="#666"
                tick={{ fontSize: 12 }}
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
                }}
              />
              <YAxis stroke="#666"  tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <ReferenceLine
                y={product.lowestEver}
                stroke="#10b981"
                strokeDasharray="5 5"
                label={{ value: `Lowest Ever $${product.lowestEver}`, position: 'left', fill: '#10b981', fontSize: 12 }}
              />
              <ReferenceLine
                y={product.highestEver}
                stroke="#ef4444"
                strokeDasharray="5 5"
                label={{ value: `Highest Ever $${product.highestEver}`, position: 'right', fill: '#ef4444', fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Lowest Ever</p>
            <p className="text-2xl font-bold text-green-400 mt-2">${product.lowestEver.toFixed(2)}</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Highest Ever</p>
            <p className="text-2xl font-bold text-red-400 mt-2">${product.highestEver.toFixed(2)}</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Average Price</p>
            <p className="text-2xl font-bold text-primary mt-2">${product.averagePrice.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-primary/30 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">AI Price Prediction</h2>
        
        {predLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border border-primary border-t-transparent"></div>
            <span className="ml-3 text-gray-400">Loading AI prediction...</span>
          </div>
        ) : prediction ? (
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">{prediction.prediction}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Deal Score</p>
                <p className="text-2xl font-bold text-primary mt-2">{prediction.dealScore}/10</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Recommendation</p>
                <p className={`text-lg font-bold mt-2 ${
                  prediction.recommendation === 'Buy Now' ? 'text-green-400' :
                  prediction.recommendation === 'Wait' ? 'text-yellow-400' :
                  'text-blue-400'
                }`}>
                  {prediction.recommendation}
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Timeframe</p>
                <p className="text-lg font-bold text-white mt-2">{prediction.timeframe}</p>
              </div>
            </div>

            {prediction.predictedLow && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-gray-400">Predicted Low Price</p>
                <p className="text-2xl font-bold text-blue-400 mt-1">${prediction.predictedLow}</p>
              </div>
            )}

            <div className={`p-4 rounded-lg ${recommendation.color} bg-opacity-10 border ${recommendation.color} border-opacity-30`}>
              <p className={`font-semibold text-lg ${recommendation.color}`}>
                {recommendation.text}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-300 leading-relaxed mb-6">{product?.aiPrediction}</p>
            
            <div className={`p-4 rounded-lg ${recommendation.color} bg-opacity-10 border ${recommendation.color} border-opacity-30`}>
              <p className={`font-semibold text-lg ${recommendation.color}`}>
                {recommendation.text}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Price Alert Form */}
      {showAlertForm && (
        <div className="bg-dark-card border border-gray-800 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Get Notified When Price Drops</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Target Price
              </label>
              <div className="flex gap-2">
                <span className="flex items-center px-4 py-3 bg-gray-900 text-gray-400 rounded-lg">$</span>
                <input
                  type="number"
                  value={priceAlert}
                  onChange={(e) => setPriceAlert(e.target.value)}
                  placeholder={lowestPrice.price.toFixed(2)}
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Alert Method
              </label>
              <div className="flex gap-4">
                {['Email', 'SMS'].map((method) => (
                  <label key={method} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alertMethod.includes(method)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAlertMethod([...alertMethod, method]);
                        } else {
                          setAlertMethod(alertMethod.filter(m => m !== method));
                        }
                      }}
                      className="w-4 h-4 rounded accent-primary cursor-pointer"
                    />
                    <span className="text-white">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
              Set Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
