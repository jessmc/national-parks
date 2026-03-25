import { useNavigate } from "react-router-dom";
import type { NearestPark } from "../../hooks/useNearestParks";
import styles from './NearestParks.module.scss'

interface NearestParksProps {
    parks: NearestPark[]
}

export default function NearestParks({ parks }: NearestParksProps) {
    const navigate = useNavigate()

    return (
        <div className={styles.wrapper}>
            <p className={styles.sectionLabel}>Parks near you</p>
            <div className={styles.track}>
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