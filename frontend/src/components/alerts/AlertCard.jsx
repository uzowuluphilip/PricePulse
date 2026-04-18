import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { formatPrice } from '../../utils/formatPrice'

function AlertCard({ alert, onDelete, onEdit }) {
  const { t } = useTranslation()

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">{alert.productName}</h3>
          <p className="text-gray-600">{t('alerts.targetPrice')}: {formatPrice(alert.targetPrice)}</p>
        </div>
        <span className={`px-3 py-1 rounded text-sm font-semibold ${alert.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {alert.active ? t('alerts.active') : t('alerts.inactive')}
        </span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onEdit(alert)}>{t('alerts.edit')}</Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(alert.id)}>{t('alerts.delete')}</Button>
      </div>
    </Card>
  )
}

export default AlertCard
