import { Map, Marker } from "@maptiler/sdk";
import { MapState } from "./MapProvider";


//Acciones del Mapa -MapReducer
type MapAction = 
    | { type: 'setMap', payload: Map } //Map es de tipo del diseño a usar Maptiler
    | { type: 'setMarkers', payload: Marker[] }

export const mapReducer = ( state: MapState, action: MapAction):MapState => {

    switch (action.type) {
        case 'setMap':
            return{
                ...state, //espace lo datos que tiene el state para hacer una copia
                isMapReady: true, //establece true a isMapReady
                map: action.payload //a map le pasamos el payload que viene en action
            }

        case 'setMarkers':
            return{
                ...state,
                markers: action.payload
            }
    
        default:
            return state;
    }

}