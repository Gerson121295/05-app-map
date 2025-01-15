import { useContext, useEffect, useLayoutEffect, useReducer } from "react";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { helpers, LngLatBounds, Map, MapStyle, Marker, Popup, data } from "@maptiler/sdk";
import { PlacesContext } from "../places/PlacesContext";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export interface MapState {
    isMapReady: boolean;
    map?: Map, //map de tipo Map de maptiler o el provedor del Mapa
    markers: Marker[]; 
}


const INITIAL_STATE: MapState ={
    isMapReady: false,
    map: undefined, //undefine para que aparezca en las Tools de React en inspeccionar
    markers: [], 
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

//En Provider se establece la informacion que se va a compartir a los componentes
export const MapProvider = ({children}:Props) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const {places, isLoadingPlaces} = useContext(PlacesContext);
    const { map } = useContext(MapContext);

  useEffect(() => {
    //marcadores de lugares buscados - Al buscar un lugar se asigna un lugar
    state.markers.forEach(marker => marker.remove() );
    const newMarkers: Marker[] = []; //arreglo de marcadores

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(`
            <h6>${place.text}</h6>
            <p>${place.place_name}</p>
          `);
        const newMarker = new Marker()
          .setPopup(popup)
          .setLngLat([lng, lat])
          .addTo(state.map!);

          newMarkers.push(newMarker); 
    }

    //Todo: Lumpiar Polylines

    //Nuevos marcadore
    dispatch({ type: 'setMarkers', payload: newMarkers })

  }, [places]) //se dispara cada vez que cambie los lugares
  


    const setMap = (map: Map) => {

      const myLocationPopup = new Popup()
            .setHTML(`
                <h4>Aqui estoy</h4>
                <p>En algún lugar del mundo</p>  
            `)

      //Se agrega el marcador al mapa
      new Marker({
        color: '#61DAFB' //color del marcador
      })
        .setLngLat(map.getCenter())
        .setPopup(myLocationPopup)
        .addTo(map);


        dispatch({ type: 'setMap', payload: map})
    }

    //Funcion establece la ruta entre 2 direcciones start y end(seleccionada)
  /*   const getRouteBetweenPoints = async(start: [number, number], end: [number, number]) => {
      const resp = await directionsApi.get<DirectionsResponse>(`/{${ start.join('.')}};{${end.join('.')}}`);
  
      console.log(getRouteBetweenPoints)
    } */

      const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
      
          // Construcción correcta de la URL
          const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')},${end.join(',')}.json`);
          const { query: coords } = resp.data;
  
          //Informacion si se usara la api de MapBox
/*/          const {distance, duraction, gemetry } = resp.data.routes[0];
          
          let kms = distance / 1000;
          kms = Math.round(kms *100);
          kms /= 100;

          const minutes = Math.floor(duraction/60);
          console.log({ kms, minutes}) //mostrar en consola la distancia y duracion en llegar a la ruta destino
          /*/

          const bounds = new LngLatBounds(
            start, start
          );

          for(const coord of coords){
            const newCoord: [number, number] = [parseFloat(coord[0]), parseFloat(coord[1])];
            bounds.extend(newCoord);
          }

          state.map?.fitBounds(bounds, {padding:200});

         
      
          //Creando la polyline en maptiler

 /*       const map = new Map({
          container: 'map',
          zoom: 14, // starting zoom
          center: [parseFloat(coords[0]), parseFloat(coords[1])], // starting position [lng, lat]
          //style:  MapStyle.DATAVIZ.DARK,
          style: MapStyle.OUTDOOR,
      });

          setMap(map); 
*/

/* 
           state.map?.on('load', async function () {
            await helpers.addPolyline(map, {
              data: 'https://docs.maptiler.com/sdk-js/examples/helper-polyline-kml/track.kml',
              outline: true
            });
          });  
*/

          state.map?.on('load', async function() {
            const geojson = await data.get('https://docs.maptiler.com/sdk-js/examples/helper-polyline-kml/track.kml');
            state.map?.addSource('gps_tracks', {
                'type': 'geojson',
                'data': geojson
            });
          });

          //Borrar la polyline si existe
          if(state.map?.getLayer('load')){
            state.map?.removeLayer('load');
            state.map?.removeSource('load');
          } 

        state.map?.addLayer({
          'id': 'grand_teton',
          'type': 'line',
          'source': 'gps_tracks',
          'layout': {},
          'paint': {
              'line-color': '#e11',
              'line-width': 4
          }
      });


          //Creacion de Polyline usando Mapbox
/*           const sourceData: addPolyline = { //addPolyline  //const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: coords
                  }
                }
              ]
            }
          }

          //Borrar la polyline si existe
          if(state.map?.getLayer('RouteString')){
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
          }

          //Agrega el polyline al mapa
          state.map?.addSource('RouteString', sourceData);

          //Diseño y color de la polyline
          state.map?.addLayer({
            id:'RouteString',
            type:'line',
            source: 'RouteString',
            layout: {
              'line-cap': 'round',
              'line-join': 'round'
            },
            paint: {
              "line-color":'black',
              "line-width":3
            }
          })
 */

          // Verifica la respuesta
          //console.log("Datos de la respuesta:", coords);
          //console.log("Datos de la respuesta:", bounds);
          
        
      };

 //https://api.maptiler.com/geocoding/{-99.1332, 19.4326};{-98.7624, 19.2826}.json?key=EaUzllHlNxi22U4bOfIt
 //https://api.maptiler.com/geocoding/{-99.1332, 19.4326},{-98.7624, 19.2826}.json?key=EaUzllHlNxi22U4bOfIt


  return (
    <MapContext.Provider value={{
        ...state,  //se esparcen los estados 

        //Methods
        setMap, //es necesario definirlo en la interface del MapContext y para saber el tipo solo colocar el mouse " setMap: (map: Map) => void" copiar eso y pegarlo en el MapContext
        getRouteBetweenPoints,
    }}>
      {children}
    </MapContext.Provider>
  )
}

