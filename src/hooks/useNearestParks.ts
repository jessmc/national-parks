import { useState, useEffect } from 'react'
import type { Park } from '../types/nps'
import { getDistanceMiles } from '../utils/distance'

export interface NearestPark extends Park {
  distance: number
}

type LocationStatus = 'idle' | 'loading' | 'granted' | 'denied'

export function useNearestParks(parks: Park[], count = 6) {
  const [nearest, setNearest] = useState<NearestPark[]>([])
  const [status, setStatus] = useState<LocationStatus>('loading')

  useEffect(() => {
    if (!parks.length) return

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const sorted = parks
          .map(park => ({
            ...park,
            distance: getDistanceMiles(
              coords.latitude,
              coords.longitude,
              parseFloat(park.latitude),
              parseFloat(park.longitude)
            )
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, count)

        setNearest(sorted)
        setStatus('granted')
      },
      () => setStatus('denied')
    )
  }, [parks, count])

  return { nearest, status }
}