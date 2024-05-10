import { 
  MapContainer, 
  TileLayer, 
  //Marker, 
  //Tooltip 
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { Modal } from './components/modal'

import styles from './styles.module.scss'

// const localizacoes = [
//   { lat: -22.909947051156635, lng: -43.16423396274847},
//   { lat: -22.909049549029007, lng: -43.17653975216686},
// ]
export function App() {
  
  return (
     <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom className={styles.container}>
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> 
        {/* {
          localizacoes.map((localizacao, index) => (
            <Marker position={[ localizacao.lat, localizacao.lng ]} key={index}>
              <Tooltip>
                AEROPORTO!!!
              </Tooltip>
            </Marker>
          ))
        }         */}
      <Modal />
     </MapContainer>
  )
}

