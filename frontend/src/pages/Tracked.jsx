import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Grid3x3, List } from 'lucide-react';
import { FAKE_PRODUCTS } from '../data/fakeProducts';

export default function Tracked() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [trackedProducts] = useState(FAKE_PRODUCTS.slice(0, 4));

  const getDealScoreBadge = (score) => {
    if (score >= 9) return { color: '#10b981', label: 'Excellent Deal', bg: 'bg-green-500/10' };
    if (score >= 7) return { color: '#3b82f6', label: 'Good Deal', bg: 'bg-blue-500/10' };
    if (score >= 5) return { color: '#f59e0b', label: 'Fair Deal', bg: 'bg-yellow-500/10' };
    return { color: '#9ca3af', label: 'Watch Price', bg: 'bg-gray-500/10' };
  };

  const minPrice = (product) => Math.min(...product.prices.map(p => p.price));
  const bestStore = (product) => {
    const best = [...product.prices].sort((a, b) => a.price - b.price)[0];
    return best.store;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tracked Products</h1>
        <p className="text-gray-400">Products you are watching</p>
      </div>

      {/* View Controls */}
      <div className="flex gap-3 mb-8">
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Products */}
      {trackedProducts.length === 0 ? (
        <div className="bg-dark-card border border-gray-700 rounded-xl p-12 text-center">
          <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-white mb-2">No tracked products</h3>
          <p className="text-gray-400 mb-6">Browse and add products to track their prices</p>
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
          >
            Browse Products
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trackedProducts.map((product) => {
            const badgeInfo = getDealScoreBadge(product.dealScore);
            return (
              <div
                key={product.id}
                className="bg-dark-card border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-all group"
              >
                {/* Product Image */}
                <div
                  className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${badgeInfo.color}33 0%, ${badgeInfo.color}11 100%)`,
                  }}
                >
                  <button className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all">
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1 line-clamp-2 text-sm">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">{product.category}</p>

                  {/* Price */}
                  <div className="mb-3">
                    <p className="text-primary font-bold text-lg">
                      From ${minPrice(product).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">{product.prices.length} stores compared</p>
                  </div>

                  {/* Best Store & Deal Score */}
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-400">Best: {bestStore(product)}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${badgeInfo.bg}`}>
                      <span style={{ color: badgeInfo.color }}>{badgeInfo.label}</span>
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="w-full px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all"
                  >
                    View Prices
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {trackedProducts.map((product) => {
            const badgeInfo = getDealScoreBadge(product.dealScore);
            return (
              <div
                key={product.id}
                className="bg-dark-card border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all flex gap-4"
              >
                {/* Image */}
                <div
                  className="w-20 h-20 rounded-lg flex-shrink-0"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${badgeInfo.color}33 0%, ${badgeInfo.color}11 100%)`,
                  }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">{product.category}</p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-sm font-bold text-primary">
                        ${minPrice(product).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Best Store</p>
                      <p className="text-sm font-medium text-white">{bestStore(product)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Deal</p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: badgeInfo.color }}
                      >
                        {badgeInfo.label}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all"
                  >
                    View
                  </button>
                  <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all">
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
