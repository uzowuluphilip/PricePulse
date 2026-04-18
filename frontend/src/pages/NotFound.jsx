import { useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0a0a]
      flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold
          text-blue-500 mb-4">404</p>
        <h1 className="text-2xl font-bold
          text-white mb-2">Page not found</h1>
        <p className="text-gray-400 mb-8">
          The page you are looking for does not exist.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6
              py-3 bg-blue-600 text-white rounded-xl
              hover:bg-blue-700 transition-colors"
          >
            <Home size={16} />
            Go Home
          </button>
          <button
            onClick={() => navigate('/search')}
            className="flex items-center gap-2 px-6
              py-3 border border-gray-700 text-white
              rounded-xl hover:border-gray-500
              transition-colors"
          >
            <Search size={16} />
            Search Products
          </button>
        </div>
      </div>
    </div>
  );
}
