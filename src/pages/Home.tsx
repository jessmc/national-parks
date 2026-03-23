import { useParks } from '../hooks/useParks'
import ParkGrid from '../components/ParkGrid/ParkGrid'
import styles from './Home.module.scss'

export default function Home() {
  const { parks, loading, error } = useParks()

  if (loading) return <p className={styles.loading}>Loading parks...</p>
  if (error) return <p className={styles.error}>Error: {error}</p>

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Explore America's wild places</p>
        <h1 className={styles.title}>National Parks</h1>
      </div>
      <ParkGrid parks={parks} />
    </div>
  )
}