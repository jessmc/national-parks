import { useParks } from '../hooks/useParks'
import ParkGrid from '../components/ParkGrid/ParkGrid'

export default function Home() {
  const { parks, loading, error } = useParks()

  if (loading) return <p>Loading parks...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>National Parks</h1>
      <ParkGrid parks={parks} />
    </div>
  )
}