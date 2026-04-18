import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import Input from '../ui/Input'

function AlertSetupModal({ product, onClose, onSave }) {
  const [targetPrice, setTargetPrice] = useState('')
  const { t } = useTranslation()

  const handleSave = () => {
    if (targetPrice) {
      onSave({
        productId: product.id,
        targetPrice: parseFloat(targetPrice)
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm">
        <h2 className="text-xl font-bold mb-4">{t('alerts.setAlert')}</h2>
        <p className="mb-4">{product.name}</p>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('alerts.targetPrice')}</label>
          <Input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="Enter target price"
          />
        </div>
        <div className="flex gap-3">
          <Button onClick={handleSave}>{t('alerts.save')}</Button>
          <Button variant="secondary" onClick={onClose}>{t('alerts.cancel')}</Button>
        </div>
      </div>
    </div>
  )
}

export default AlertSetupModal
