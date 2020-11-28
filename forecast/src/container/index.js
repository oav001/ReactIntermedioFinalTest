import React, { useEffect, useState } from 'react';
import MapView from '../components/Map';

const API_KEY = "0a2d214d66c2ae5cece6f107a2686626";


const WheaterForm = () => { 

const [city, setCity] = useState('');
const [humidity, setHumidity] = useState('');
const [temperature, setTemperature] = useState('');
const [mintemp, setMintemp] = useState('');
const [maxtemp, setMaxtemp] = useState('');
const [pressure, setPressure] = useState('');
const [latitude, setLatitude] = useState('');
const [long, setLong] = useState('');


// useEffect(() => {
// const getWheaterInfo =  async () =>{
// const api_call = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0a2d214d66c2ae5cece6f107a2686626');  
// const response = await api_call.json();
// setTemperature(response.main.temp);
// setHumidity(response.main.humidity);
// setMaxtemp(response.main.temp_max);
// setMintemp(response.main.temp_min);
// setPressure(response.main.pressure);
// setLatitude(response.coord.lat);
// setLong(response.coord.lon);
// console.log(response);
// }
// getWheaterInfo();
// }
// ,[]);



const getWheaterInfo =  async (e) =>{

    e.preventDefault();
    
    console.log(city);

    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a2d214d66c2ae5cece6f107a2686626`);
            
    const response = await api_call.json();

    console.log(response.name);

    setTemperature(response.main.temp);
    setHumidity(response.main.humidity);
    setMaxtemp(response.main.temp_max);
    setMintemp(response.main.temp_min);
    setPressure(response.main.pressure);
    setLatitude(response.coord.lat);
    setLong(response.coord.lon);
}


const getMap = () =>
{
console.log('Entro');
if (latitude)
{
    console.log('Hay Latitud');
return ( 

<div> <MapView lati='13' longi='-86'/></div>
)
}
console.log('No hay Latitud');
return (
    
 <div> <MapView lati='13' longi='-86'/> </div> 
 )

}



return (
<div> 

<div> 
<form onSubmit={(e) => {getWheaterInfo(e)}}> 
<input 
type="text" 
placeholder="Ingrese Ciudad" 
name="location"
onChange={(e) => setCity(e.target.value)}/>
<button onClick={(e) => {getWheaterInfo(e)}}>Obtener Clima</button>
</form>


</div>



<div className="labels">
<h1>Ciudad</h1>
<h1>Temperatura</h1>
<h1>Humedad</h1>
<h1>Temperatura Minima</h1>
<h1>Temperatura Maxima</h1>
<h1>Presion</h1>
<h1>Latitude</h1>
<h1>Longitud</h1>

</div>

<h1>{city}</h1>
<h1>{temperature}</h1>
<h1>{humidity}</h1>
<h1>{mintemp}</h1>
<h1>{maxtemp}</h1>
<h1>{pressure}</h1>
<h1>{latitude}</h1>
<h1>{long}</h1>

<div>{getMap()}</div>

</div>


);
}

export default WheaterForm;