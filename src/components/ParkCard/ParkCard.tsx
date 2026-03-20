import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Park } from '../../types/nps'
import styles from './ParkCard.module.scss'

interface ParkCardProps {
    park: Park
}

export default function ParkCard({ park }: ParkCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate();

    const physicalAddress = park.addresses.find(a => a.type === 'Physical');
    const hours = park.operatingHours[0]?.description ?? 'Hours not available';
    const fee = park.entranceFees[0]?.cost
                ? `$${parseFloat(park.entranceFees[0].cost).toFixed(0)} per vehicle`
                : 'No entrance fee';

    function handleClick() {
        if (!isFlipped) {
            setIsFlipped(true);
        } else {
            navigate(`/parks/${park.parkCode}`);
        }
    }

    return (
        <div 
            className={`${styles.cardWrap} ${isFlipped ? styles.flipped : ''}`}
            onClick={handleClick}
        >
            <div className={styles.cardInner}>

                <div className={styles.cardFront}>
                    <img
                        src={park.images[0]?.url}
                        alt={park.images[0]?.altText ?? park.fullName}
                        className={styles.cardImage}
                    />
                    <div className={styles.nameBar}>
                        <p className={styles.parkName}>{park.fullName}</p>
                        <p className={styles.parkState}>{park.states}</p>
                    </div>
                </div>

                <div className={styles.cardBack}>
                    <p className={styles.backTitle}>
                        {park.fullName.replace(' National Park', '')}
                    </p>

                    <div className={styles.infoBlock}>
                        <p className={styles.infoLabel}>Hours</p>
                        <p className={styles.infoValue}>{hours}</p>
                        
                    </div>

                    <div className={styles.infoBlock}>
                        <p className={styles.infoLabel}>Address</p>
                        <p className={styles.infoValue}>
                            {physicalAddress
                                ? `${physicalAddress.city}, ${physicalAddress.stateCode} ${physicalAddress.postalCode}`
                                : 'Address not available'
                            }
                        </p>
                    </div>

                    <div className={styles.infoBlock}>
                        <p className={styles.infoLabel}>Entrance Fee</p>
                        <p className={styles.infoValue}>{fee}</p>
                    </div>

                    <div className={styles.divider} />

                    <p className={styles.infoLabel}>Activities</p>
                    <div className={styles.badges}>
                        {park.activities.slice(0, 4).map(activity => (
                            <span key={activity.id} className={styles.badge}>
                                {activity.name}
                            </span>
                        ))}
                    </div>

                    <p className={styles.clickHint}>→ Tap to explore this park</p>
                </div>

            </div>
        </div>

    )
}

