import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">PricePulse</h3>
            <p>{t('footer.about')}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2">
              <li><a href="#about">{t('footer.aboutUs')}</a></li>
              <li><a href="#contact">{t('footer.contact')}</a></li>
              <li><a href="#privacy">{t('footer.privacy')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.social')}</h4>
            <div className="flex gap-4">
              <a href="#twitter">Twitter</a>
              <a href="#facebook">Facebook</a>
              <a href="#instagram">Instagram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center">
          <p>&copy; 2024 PricePulse. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
