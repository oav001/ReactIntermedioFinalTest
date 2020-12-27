import {React,useState} from 'react'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'

import "leaflet/dist/leaflet.css";
import './styles.css'


const MapView =({latitud, longitud, ciudad })=>{

    

    const position = [latitud, longitud];

    if(latitud === 0)
    return <div></div>;

    return (
        <div>

            <MapContainer center={position} zoom={5} >
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                
                </Marker>
           </MapContainer>
        
        </div>
    )
}
export default MapView;