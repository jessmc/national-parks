import { useState, useEffect } from 'react'
import { fetchParks } from '../api/npsApi'
import type { Park } from '../types/nps'

export function useParks(stateCode?: string) {
  const [parks, setParks] = useState<Park[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchParks(stateCode)
      .then(res => {
        const nationalParks = res.data.filter(
          (park: Park) => park.designation === 'National Park'
        )
        setParks(nationalParks)
        setError(null)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [stateCode])

  return { parks, loading, error }
}