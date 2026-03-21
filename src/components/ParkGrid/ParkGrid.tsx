import { useState, useMemo } from 'react'
import type { Park } from '../../types/nps'
import ParkCard from '../ParkCard/ParkCard'
import styles from './ParkGrid.module.scss'

interface ParkGridProps {
  parks: Park[]
}

export default function ParkGrid({ parks }: ParkGridProps) {
  const [search, setSearch] = useState('')
  const [selectedState, setSelectedState] = useState('')

  // get the states list from park api
  const states = useMemo(() => {
    const allStates = parks.flatMap(park =>
      park.states.split(',').map(s => s.trim())
    )
    return [...new Set(allStates)].sort()
  }, [parks])

  // filter parks based on search and state
  const filteredParks = useMemo(() => {
    return parks.filter(park => {
      const matchesSearch = park.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesState = selectedState
        ? park.states.split(',').map(s => s.trim()).includes(selectedState)
        : true
      return matchesSearch && matchesState
    })
  }, [parks, search, selectedState])

  // clear the input and state dropdown
  const clearSearch = () => {
    setSearch('');
    setSelectedState('');
  }

  return (
    <div className={styles.wrapper}>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search parks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          className={styles.stateSelect}
        >
          <option value="">All states</option>
          {states.map(state => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <button onClick={clearSearch}>Clear</button>
      </div>

      <p className={styles.count}>
        Showing {filteredParks.length} park{filteredParks.length !== 1 ? 's' : ''}
      </p>

      {filteredParks.length === 0 ? (
        <div className={styles.empty}>
          <p>No parks match your search.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredParks.map(park => (
            <ParkCard key={park.id} park={park} />
          ))}
        </div>
      )}

    </div>
  )
}