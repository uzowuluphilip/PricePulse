import { useState } from 'react'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const search = async (searchQuery) => {
    setQuery(searchQuery)
    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${searchQuery}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  return { query, results, loading, search }
}
