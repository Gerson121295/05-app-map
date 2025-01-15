import { useContext, useLayoutEffect, useRef } from "react"
import { MapContext, PlacesContext } from "../context"
import { Loading } from "./";
//import maplibregl from 'maplibre-gl';
//import { Map } from 'maplibre-gl';

import { Map, MapStyle } from "@maptiler/sdk";
import 'maplibre-gl/dist/maplibre-gl.css';


export const MapView = () => {

    //Con el useContext se obtiene la data(isLoading, userLocation) de PlacesContext
    const { isLoading, userLocation } = useContext(PlacesContext); 
    const {isMapReady, setMap, map } = useContext(MapContext);


    const mapDiv = useRef<HTMLDivElement>(null); //mantener la referencia al div establecido con ref mapDiv

    
    useLayoutEffect(() => {
      if( !isLoading ) { //isLoading es false se ejeucta
        const map = new Map({
          container: mapDiv.current! , // container id. ! sig que se tendra un valor
          style:  `https://api.maptiler.com/maps/basic-v2/style.json?key=${'EaUzllHlNxi22U4bOfIt'}`,
          //style: MapStyle.STREETS, //diseño de calle de Maptiler //diseño de MapLibre: 'https://demotiles.maplibre.org/style.json', // style URL
          center: userLocation, // starting position [lng, lat]
          zoom: 14 // starting zoom
      });

          setMap(map);
      }  
    }, [ isLoading ]) //se ejecuta cada vez que el isLoading cambia


    if(isLoading){ //si isLoading es true muestra el Loading
        return (<Loading/>)
    }


  return (
    <div 
      ref={mapDiv}
      style={{
        background: 'red',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      {userLocation?.join(',')}
    </div>
  )
}


//Lat:14.561006652984599, Long: -91.67757018739849