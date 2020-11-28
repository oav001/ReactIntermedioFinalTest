import React, { useState } from 'react';
import {MapContainer,Marker,TileLayer} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './styles.css'



const MapView = ({lati,longi}) =>{

const [la,setLa] = useState(15);
const [lo,setLo] = useState(-86);

console.log(lati);
console.log(longi);

setLa(lati);
setLo(longi);


// setLa(latitude);
// setLo(longitud);

return  (
<MapContainer center={{lat: la ,lng:lo}} zoom={5} scrollWheelZoom={false}>    
<TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

</MapContainer>
)

}

export default MapView;