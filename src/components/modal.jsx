import { useState } from "react";
import { Marker, Popup, Tooltip, useMap } from "react-leaflet";
import { Box, Button, TextField, Typography } from '@mui/material'
import { Search } from 'lucide-react'

import { buscarCep, buscarCordenadas } from "../services/geo";
import styles from './styles.module.scss'

export function Modal() {

    const [cep, setCep] = useState('')
    const [number, setNumber] = useState('')
    
    const [geoConfirme, setGeoConfirme] = useState(null)
    const [endereco, setEndereco] = useState(null)
    const [markers, setMarkers] = useState([])

    const map = useMap()

    async function onSubmit() {
        const enderecoResposta = await buscarCep(cep)
        const enderecoFormatado = `${enderecoResposta.logradouro},${number}, ${enderecoResposta.localidade}`;
        const localidade = await buscarCordenadas(enderecoFormatado)

        if(localidade) {
            setGeoConfirme({ lat: localidade.lat, lng: localidade.lng })
            setEndereco(enderecoResposta)
            map.setView({ lat: localidade.lat, lng: localidade.lng }, 15, { animate: true })
        }
        // https://nominatim.openstreetmap.org/search.php?q=rua%20doutor%20clemente%20marques,%2023%20rj&polygon_geojson=1&format=jsonv2
      
    }


    function addLocalizacao() {
        setMarkers(prevState => ([ ...prevState, geoConfirme]))
        setGeoConfirme(null)
    }

    return (
        <>
            
            {
                geoConfirme && (
                    <Marker position={[geoConfirme.lat, geoConfirme.lng]}>
                        <Popup>{`${endereco.logradouro}, ${number} - ${endereco.localidade}`}</Popup>
                        <Tooltip>{`${endereco.logradouro}, ${number} - ${endereco.localidade}`}</Tooltip>
                    </Marker>
                )
            }

            {
                // Possuindo um estado que possa adicionar diversos localizações (marcadores), apenas
                // percorra a lista informando a latitude e longitude 
                markers.map((mark, index) => (
                    <Marker key={index} position={[mark.lat, mark.lng]} />
                ))
            }

            <div className={styles.containerModal}>
                <Box padding={4}>
                    <Typography variant="h5" mb={2}>Cadastrar lugar favorito</Typography>

                    <form>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField variant="outlined" label="CEP" onChange={event => setCep(event.target.value)} />
                            <TextField variant="outlined" label="Número" onChange={event => setNumber(event.target.value)} />
                            
                            <Button onClick={onSubmit} fullWidth variant="contained" startIcon={<><Search /></>}>Pesquisar</Button>
                            <Button onClick={addLocalizacao} fullWidth variant="contained" color="success">Adicionar</Button>
                        </Box>
                    </form>

                </Box>
            </div>
        </>
    )
}