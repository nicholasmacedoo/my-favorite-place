import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import styles from './styles.module.scss'
import { Modal } from './components/modal'

function App() {
  return (
      <div >
          <MapContainer 
            center={[-22.949007654423568, -43.21041999981461]} 
            zoom={13} 
            scrollWheelZoom={true} 
            className={styles.container}
          >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Modal />
        </MapContainer>
    </div>
  )
}

export default App
