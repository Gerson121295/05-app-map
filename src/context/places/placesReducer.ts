
//placesReducer es una funcion pura(una funcion que puede resolver basado en los argumentos no necesita del exterior)

import { PlacesState } from "./PlacesProvider.";
import { Feature } from '../../interfaces/places';

//type es parecido a definir una interface 
type PlacesAction =  //se define las acciones permitidas en la app
    |   { type: 'setUserLocation', payload: [number, number]  } //cuando se reciba una accion de tipo setUserLocation se tiene en el payload la longitud y latitud
    |   { type: 'setLoadingPlaces' }
    |   { type: 'setPlaces', payload: Feature[] }


//punto de entrada de un reducer recibe el estado y siempre regresa un tipo de placesState
export const placesReducer = ( state: PlacesState, action: PlacesAction): PlacesState => {

    switch (action.type) {
        case 'setUserLocation': //se ejecuta el caso cuando se reciba la accion setUserLocation
            return {
                ...state, //espace lo datos que tiene el state para hacer una copia
                isLoading: false, //cambia el isLoading a false
                userLocation: action.payload, //userLocation es igual al valor que recibe en la accion
            }
        
        case 'setLoadingPlaces':
            return{
                ...state,
                isLoadingPlaces: true, //actualmente se estan cargando los lugares
                places: [],
            }

        case 'setPlaces':
            return{
                ...state,
                isLoadingPlaces: false, //false porque ya se cargaron los lugares
                places: action.payload
            }
    
        default: //si no se recibe una accion definida por default retorna el state, no hubo ningun cambio en el estado
            return state;
    }
}