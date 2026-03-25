import { useParks } from '../hooks/useParks'
import { useNearestParks } from '../hooks/useNearestParks'
import ParkGrid from '../components/ParkGrid/ParkGrid'
import NearestParks from '../components/NearestParks/NearestParks'
import styles from './Home.module.scss'

export default function Home() {
  const { parks, loading, error } = useParks()
  const { nearest, status } = useNearestParks(parks)

  if (loading) return <p className={styles.loading}>Loading parks...</p>
  if (error) return <p className={styles.error}>Error: {error}</p>

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Explore America's wild places</p>
        <h1 className={styles.title}>National Parks</h1>
      </div>

      {status === 'granted' && nearest.length > 0 && (
        <NearestParks parks={nearest} />
      )}

      {status === 'denied' && (
        <p className={styles.locationDenied}>
          Enable location access to see parks near you.
        </p>
      )}

      <ParkGrid parks={parks} />
    </div>
  )
}