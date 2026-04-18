import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Sidebar() {
  const { t } = useTranslation()

  return (
    <aside className="w-64 bg-gray-100 p-6">
      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-blue-600">
          {t('sidebar.dashboard')}
        </Link>
        <Link to="/search" className="block hover:text-blue-600">
          {t('sidebar.search')}
        </Link>
        <Link to="/alerts" className="block hover:text-blue-600">
          {t('sidebar.alerts')}
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
