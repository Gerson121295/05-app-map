import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MapsApp } from './MapsApp';

//Nivel Global - Para el mapbox aqui se agrega la importacion y se agrega el token de acceso
/* import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
 */
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';


maptilersdk.config.apiKey = 'EaUzllHlNxi22U4bOfIt';


if( !navigator.geolocation) {//si no existe la geolocalizacion
  alert('Tu navegador no tiene opcion de Geolocation');
  throw new Error('Tu navegador no tiene opcion de Geolocation');
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>,
)
