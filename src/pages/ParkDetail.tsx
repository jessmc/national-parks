import { useParams, useNavigate } from 'react-router-dom'
import { useParkTab } from '../hooks/useParkTab'
import {
  fetchParkByCode,
  fetchThingsToDo,
  fetchVisitorCenters,
  fetchAlerts
} from '../api/npsApi'
import type { Park, ThingToDo, VisitorCenter, Alert } from '../types/nps'
import styles from './ParkDetail.module.scss'


export default function ParkDetail() {
  const { parkCode } = useParams<{ parkCode: string }>()
  const navigate = useNavigate()

  const { data: parkData, loading: parkLoading, error: parkError } = useParkTab<Park>(fetchParkByCode, parkCode ?? '')
  const { data: thingsToDo, loading: thingsLoading } = useParkTab<ThingToDo>(fetchThingsToDo, parkCode ?? '')
  const { data: visitorCenters, loading: centersLoading } = useParkTab<VisitorCenter>(fetchVisitorCenters, parkCode ?? '')
  const { data: alerts, loading: alertsLoading } = useParkTab<Alert>(fetchAlerts, parkCode ?? '')

  if (parkLoading) return <p className={styles.loading}>Loading park...</p>
  if (parkError) return <p className={styles.error}>Error: {parkError}</p>
  
  const park = parkData[0]
  if (!park) return <p className={styles.error}>Park not found.</p>

  const physicalAddress = park.addresses.find(a => a.type === 'Physical')
  const fee = park.entranceFees[0]?.cost
    ? `$${parseFloat(park.entranceFees[0].cost).toFixed(0)} per vehicle`
    : 'No entrance fee'
  const hours = park.operatingHours[0]?.description ?? 'Hours not available'



  return (
    <div className={styles.page}>

      <button className={styles.backButton} onClick={() => navigate('/')}>
        ← Back to parks
      </button>

      {/* Hero */}
      <div className={styles.hero}>
        <img
          src={park.images[0]?.url}
          alt={park.images[0]?.altText ?? park.fullName}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{park.fullName}</h1>
          <p className={styles.heroState}>{park.states}</p>
        </div>
      </div>

      {/* Description */}
      <section className={styles.section}>
        <p className={styles.description}>{park.description}</p>
      </section>

      {/* Quick info */}
      <section className={styles.infoBar}>
        <div className={styles.infoItem}>
          <p className={styles.infoLabel}>Entrance fee</p>
          <p className={styles.infoValue}>{fee}</p>
        </div>
        <div className={styles.infoItem}>
          <p className={styles.infoLabel}>Location</p>
          <p className={styles.infoValue}>
            {physicalAddress
              ? `${physicalAddress.city}, ${physicalAddress.stateCode}`
              : park.states}
          </p>
        </div>
        <div className={styles.infoItem}>
          <p className={styles.infoLabel}>Hours</p>
          <p className={styles.infoValue}>{hours}</p>
        </div>
        <div className={styles.infoItem}>
          <p className={styles.infoLabel}>More info</p>
          <a
            href={park.url}
            target="_blank"
            rel="noreferrer"
            className={styles.infoLink}
          >
            NPS website →
          </a>
        </div>
      </section>

      {/* Alerts */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Alerts & Notices</h2>
        {alertsLoading ? (
          <p className={styles.sectionLoading}>Loading alerts...</p>
        ) : alerts.length === 0 ? (
          <p className={styles.empty}>No current alerts for this park.</p>
        ) : (
          <div className={styles.alertList}>
            {alerts.map(alert => (
              <div key={alert.id} className={styles.alertCard}>
                <span className={styles.alertCategory}>{alert.category}</span>
                <p className={styles.alertTitle}>{alert.title}</p>
                <p className={styles.alertDescription}>{alert.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Things to do */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Things To Do</h2>
        {thingsLoading ? (
          <p className={styles.sectionLoading}>Loading activities...</p>
        ) : thingsToDo.length === 0 ? (
          <p className={styles.empty}>No activities listed for this park.</p>
        ) : (
          <div className={styles.thingsGrid}>
            {thingsToDo.map(thing => (
              <div key={thing.id} className={styles.thingCard}>
                {thing.images[0] && (
                  <img
                    src={thing.images[0].url}
                    alt={thing.images[0].altText}
                    className={styles.thingImage}
                  />
                )}
                <div className={styles.thingContent}>
                  <p className={styles.thingTitle}>{thing.title}</p>
                  <p className={styles.thingDescription}>{thing.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Visitor centers */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Visitor Centers</h2>
        {centersLoading ? (
          <p className={styles.sectionLoading}>Loading visitor centers...</p>
        ) : visitorCenters.length === 0 ? (
          <p className={styles.empty}>No visitor centers listed for this park.</p>
        ) : (
          <div className={styles.centerList}>
            {visitorCenters.map(center => (
              <div key={center.id} className={styles.centerCard}>
                <p className={styles.centerName}>{center.name}</p>
                <p className={styles.centerDescription}>{center.description}</p>
                {center.operatingHours[0] && (
                  <p className={styles.centerHours}>
                    {center.operatingHours[0].description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}