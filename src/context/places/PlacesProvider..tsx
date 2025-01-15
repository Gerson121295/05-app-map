

//PlacesProvider define como queda el estado de la app que se almacena en memoria

import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/places";

//interface define el tipo de dato del objeto
export interface PlacesState {
    isLoading: boolean;
    userLocation?: [ number, number]; //se agrega ? para definir que userLocation es opcional
    isLoadingPlaces: boolean;
    places: Feature[];
}


const INITIAL_STATE: PlacesState = { //INITIAL_STATE es de tipo PlacesState
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
}

interface Props {
        children: JSX.Element | JSX.Element[];  //children es un JSX:Element o un arreglo
    }

    //En Provider se establece la informacion que se va a compartir a los componentes
export const PlacesProvider = ({children}:Props) => { //recibe el children como props

    //uso del useReducer definido en placesReducer.ts. En useReducer el state contiene el estado y con dispatch se define el metodo a despachar
    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE); //useReducer recibe el reducer(placesReducer), el estado inicial(INITIAL_STATE), 3ro. la inicializacion(opcional)

    useEffect( () => {
        getUserLocation()
            .then(lngLat => dispatch({type:'setUserLocation', payload: lngLat}))
    }, []);


    const searchPlacesByTerm = async( query: string ): Promise<Feature[]> => { //devuelve una respuesta de tipo Promise de tipo Feature[] arreglo de Feature
        if(query.length === 0) {
            // Limpiar el state la barra de busqueda de lugares esta vacio
            dispatch({type: 'setPlaces', payload: [] }) //al payload se le envia un arreglo vacio
            return []; 
        }
        
        if(!state.userLocation) throw new Error('No hay ubicacion del usuairo');

        dispatch({type:'setLoadingPlaces'}); //se despacha la accion setLoadingPlaces


        const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, //{
            /* params: { //para mapbox en maptiler no tiene params
                proximity: state.userLocation.join(',')
            } */
            // }
        );

        //se despacha la accion 'setPlaces'  y se envia el payload la data de respuesta del resp
        dispatch({ type: 'setPlaces', payload: resp.data.features })

    //console.log(resp.data.features[0]);
    return resp.data.features;

    }

    return(
        <PlacesContext.Provider value={{
            ...state, //Esparse todo el state para que facilmente se tome la data o metodos del contexto del provider
            
            //Methods
            searchPlacesByTerm
        }}>
            {children}
        </PlacesContext.Provider>
    )
}



