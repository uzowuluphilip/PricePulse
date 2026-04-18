import { useTranslation } from 'react-i18next'
import ProductCard from '../product/ProductCard'

function SearchResults({ results, loading }) {
  const { t } = useTranslation()

  if (loading) {
    return <div>{t('search.loading')}</div>
  }

  if (!results || results.length === 0) {
    return <div>{t('search.noResults')}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default SearchResults
