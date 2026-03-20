import ParkCard from '../components/ParkCard/ParkCard'
import { useParks } from '../hooks/useParks'

export default function Home() {
    const { parks, loading, error } = useParks()

    if (loading) return <p>Loading parks...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div style={{ padding: '2rem' }}>
            <h1>National Parks</h1>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {parks.map(park => (
                    <ParkCard key={park.id} park={park} />
                ))}
            </div>
        </div>
    )
}