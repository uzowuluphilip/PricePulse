import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { formatPrice } from '../../utils/formatPrice'

function ProductCard({ product }) {
  return (
    <Card>
      <Link to={`/product/${product.id}`}>
        <div className="mb-4">
          <h3 className="text-lg font-bold truncate">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.category}</p>
        </div>
        <div className="mb-4">
          <Image src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(product.currentPrice)}
          </span>
          <Badge variant={product.priceChange > 0 ? 'danger' : 'success'}>
            {product.priceChange > 0 ? '↑' : '↓'} {Math.abs(product.priceChange)}%
          </Badge>
        </div>
      </Link>
    </Card>
  )
}

function Image({ src, alt, className }) {
  return <img src={src} alt={alt} className={className} onError={(e) => e.target.style.display = 'none'} />
}

export default ProductCard
