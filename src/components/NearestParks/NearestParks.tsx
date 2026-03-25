import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import type { NearestPark } from "../../hooks/useNearestParks"
import styles from './NearestParks.module.scss'

interface NearestParksProps {
  parks: NearestPark[]
}

export default function NearestParks({ parks }: NearestParksProps) {
  const navigate = useNavigate()
  const trackRef = useRef<HTMLDivElement>(null)

//   function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
//     if (trackRef.current) {
//      // e.preventDefault()
//       //trackRef.current.scrollLeft += e.deltaY
//     }
//   }

  function scrollLeft() {
    trackRef.current?.scrollBy({ left: -340, behavior: 'smooth' })
  }

  function scrollRight() {
    trackRef.current?.scrollBy({ left: 340, behavior: 'smooth' })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.sectionLabel}>Parks near you</p>
        <div className={styles.arrows}>
          <button
            className={styles.arrow}
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            className={styles.arrow}
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
      <div
        className={styles.track}
        ref={trackRef}
        
      >
        {parks.map(park => (
          <div
            key={park.id}
            className={styles.card}
            onClick={() => navigate(`/parks/${park.parkCode}`)}
          >
            <img
              src={park.images[0]?.url}
              alt={park.images[0]?.altText ?? park.fullName}
              className={styles.cardImage}
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <div className={styles.cardInfo}>
                <p className={styles.cardName}>{park.fullName}</p>
                <p className={styles.cardState}>{park.states}</p>
              </div>
              <span className={styles.cardDistance}>
                {Math.round(park.distance)} mi
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}