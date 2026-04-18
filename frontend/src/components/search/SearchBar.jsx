import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Input from '../ui/Input'
import Button from '../ui/Button'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const { t } = useTranslation()

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <div className="flex gap-4">
      <Input
        placeholder={t('search.placeholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <Button onClick={handleSearch}>{t('search.button')}</Button>
    </div>
  )
}

export default SearchBar
