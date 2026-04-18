import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Grid3x3, List, Heart } from 'lucide-react';
import { FAKE_PRODUCTS, CATEGORIES, STORES } from '../data/fakeProducts';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStore, setSelectedStore] = useState('All Stores');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleSearch = useCallback((searchQuery) => {
    setLoading(true);
    setTimeout(() => {
      let filtered = FAKE_PRODUCTS.filter((p) => {
        const matchesQuery =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === 'All' || p.category === selectedCategory;

        return matchesQuery && matchesCategory;
      });

      // Apply sorting
      if (sortBy === 'price-low') {
        filtered.sort((a, b) => Math.min(...a.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price)));
      } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => Math.min(...b.prices.map(p => p.price)) - Math.min(...a.prices.map(p => p.price)));
      } else if (sortBy === 'discount') {
        filtered.sort((a, b) => {
          const aDiscount = ((a.highestEver - a.prices[0].price) / a.highestEver) * 100;
          const bDiscount = ((b.highestEver - b.prices[0].price) / b.highestEver) * 100;
          return bDiscount - aDiscount;
        });
      } else if (sortBy === 'deal-score') {
        filtered.sort((a, b) => b.dealScore - a.dealScore);
      }

      setResults(filtered);
      setLoading(false);
    }, 400);
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      handleSearch(query);
    }, 400);
    setDebounceTimer(timer);
  }, [query, selectedCategory, sortBy, handleSearch]);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    } else {
      setResults(FAKE_PRODUCTS);
      setLoading(false);
    }
  }, []);

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
      {/* Search Bar */}
      <div className="mb-8">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for any product..."
              className="w-full pl-12 pr-4 py-3 bg-dark-card border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="text-sm text-gray-400">
          Showing {results.length} result{results.length !== 1 ? 's' : ''}
          {query && ` for "${query}"`}
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="mb-8 space-y-4">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Store Filter & Sort */}
        <div className="flex gap-3 flex-wrap items-center">
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="px-4 py-2 bg-dark-card border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {STORES.map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-dark-card border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
            <option value="deal-score">Best Deal Score</option>
          </select>

          {/* View Mode Toggle */}
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        // Skeleton Loading
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-dark-card border border-gray-800 rounded-lg p-4 animate-pulse"
            >
              <div className="h-40 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        // Empty State
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
          <p className="text-gray-400 mb-6">
            Try searching for "headphones", "laptops", "shoes", or browse by category
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((product) => {
            const dealScore = getDealScoreBadge(product.dealScore);
            return (
              <div
                key={product.id}
                className="bg-dark-card border border-gray-800 rounded-lg overflow-hidden hover:border-primary/50 transition-all group"
              >
                {/* Image Placeholder */}
                <div
                  className="h-40 bg-gradient-to-br flex items-center justify-center text-4xl relative overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${
                      {
                        'Electronics': '#ef4444',
                        'Fashion': '#f97316',
                        'Computers': '#3b82f6',
                        'Home': '#8b5cf6',
                        'Sports': '#10b981',
                      }[product.category] || '#3b82f6'
                    } 0%, ${
                      {
                        'Electronics': '#dc2626',
                        'Fashion': '#ea580c',
                        'Computers': '#1d4ed8',
                        'Home': '#7c3aed',
                        'Sports': '#059669',
                      }[product.category] || '#1d4ed8'
                    } 100%)`,
                  }}
                >
                  <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-all">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white line-clamp-2 flex-1">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-2xl font-bold text-primary mb-1">
                    From ${minPrice(product).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    {product.prices.length} stores compared
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-gray-400">Best: {bestStore(product)}</p>
                    <div
                      className={`text-xs px-2 py-1 rounded font-semibold ${dealScore.bg}`}
                      style={{ color: dealScore.color }}
                    >
                      {dealScore.label}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="w-full px-3 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    View Prices
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // List View
        <div className="space-y-3">
          {results.map((product) => {
            const dealScore = getDealScoreBadge(product.dealScore);
            return (
              <div
                key={product.id}
                className="bg-dark-card border border-gray-800 rounded-lg p-4 hover:border-primary/50 transition-all flex gap-4"
              >
                {/* Icon */}
                <div
                  className="w-20 h-20 rounded-lg flex-shrink-0 flex items-center justify-center text-3xl"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${
                      {
                        'Electronics': '#ef4444',
                        'Fashion': '#f97316',
                        'Computers': '#3b82f6',
                        'Home': '#8b5cf6',
                        'Sports': '#10b981',
                      }[product.category] || '#3b82f6'
                    } 0%, ${
                      {
                        'Electronics': '#dc2626',
                        'Fashion': '#ea580c',
                        'Computers': '#1d4ed8',
                        'Home': '#7c3aed',
                        'Sports': '#059669',
                      }[product.category] || '#1d4ed8'
                    } 100%)`,
                  }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{product.name}</h3>
                      <p className="text-xs text-gray-400">{product.category}</p>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded font-semibold ${dealScore.bg}`}
                      style={{ color: dealScore.color }}
                    >
                      {dealScore.label}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    {product.prices.filter(p => p.inStock).length} in stock across {product.prices.length} stores
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-primary">
                      From ${minPrice(product).toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400">Best: {bestStore(product)}</span>
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="ml-auto px-4 py-1 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
                    >
                      View Prices →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
