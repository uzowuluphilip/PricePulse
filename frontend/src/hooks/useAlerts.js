import { useState, useEffect } from 'react'

export function useAlerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/alerts')
      const data = await response.json()
      setAlerts(data)
    } catch (error) {
      console.error('Error fetching alerts:', error)
    } finally {
      setLoading(false)
    }
  }

  const createAlert = async (alert) => {
    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert)
      })
      const data = await response.json()
      setAlerts([...alerts, data])
    } catch (error) {
      console.error('Error creating alert:', error)
    }
  }

  const deleteAlert = async (alertId) => {
    try {
      await fetch(`/api/alerts/${alertId}`, { method: 'DELETE' })
      setAlerts(alerts.filter(a => a.id !== alertId))
    } catch (error) {
      console.error('Error deleting alert:', error)
    }
  }

  return { alerts, loading, createAlert, deleteAlert, fetchAlerts }
}
