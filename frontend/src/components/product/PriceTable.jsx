import { useTranslation } from 'react-i18next'
import { formatPrice } from '../../utils/formatPrice'

function PriceTable({ prices }) {
  const { t } = useTranslation()

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">{t('product.date')}</th>
            <th className="px-4 py-2 text-left">{t('product.price')}</th>
            <th className="px-4 py-2 text-left">{t('product.seller')}</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{new Date(price.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{formatPrice(price.price)}</td>
              <td className="px-4 py-2">{price.seller}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PriceTable
