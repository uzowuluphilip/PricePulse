import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const { t } = useTranslation()

  return (
    <nav className="flex bg-white shadow-md">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          PricePulse
        </Link>
        <div className="flex gap-6">
          <Link to="/search">{t('nav.search')}</Link>
          {user ? (
            <>
              <Link to="/dashboard">{t('nav.dashboard')}</Link>
              <Link to="/alerts">{t('nav.alerts')}</Link>
              <button onClick={logout}>{t('nav.logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login">{t('nav.login')}</Link>
              <Link to="/register">{t('nav.register')}</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
