import React from 'react'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'

import "leaflet/dist/leaflet.css";
import './styles.css'


const MapView =({latitud, longitud})=>{

    const position = [latitud, longitud];

    if(latitud === 0)
    return <div></div>;

    return (
        <div className="col-12 mapdiv">

            <MapContainer center={position} zoom={13} >
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                    <Popup>
                       
                    </Popup>
                </Marker>
           </MapContainer>
        
        </div>
    )
}
export default MapView;