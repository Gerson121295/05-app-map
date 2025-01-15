import { useContext, useState } from "react";
import { PlacesContext, MapContext } from "../context"
import { LoadingPlaces } from "./";
import { Feature } from "../interfaces/places";


export const SearchResult = () => {

    const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
    const { map, getRouteBetweenPoints } = useContext(MapContext);

    const [activeId, setActiveId] = useState(''); //inicializar el useState con '' indica que sera un string


    //Lugar clicado
    const onPlaceClicked = ( place: Feature) => {
        
        const [lng, lat] = place.center; //de place.center se extrae la longitud y latitud
        setActiveId(place.id);

        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }

    const getRoute = (place: Feature) => {
        
        if(!userLocation) return; //si userLocation no existe no hace nada return
        const [lng, lat] = place.center; //place.center es el lugar seleccionado por lo tanto seria la ruta final

        getRouteBetweenPoints(userLocation, [lng, lat]); //recibe las coordenadas: start(userLocation), end:[lng, lat]
    }

    if(isLoadingPlaces){
        return <LoadingPlaces />  
    }

    if(places.length === 0){ //si la cantidad de lugares es 0 retorna un fragmento vacio xq no hay nada que mostrar
        return <></>
    }

    
  return (

    <ul className="list-group mt-3"  //este mt-3 margin top se puede poner condicionado si hay elementos se agrega si no, no se agrega
    >

        {
            places.map(place => (

                <li 
                    key={place.id}
                    className={`list-group-item list-group-item-action pointer ${(activeId === place.id) ? 'active' : '' }`}  //forma 2: ${(activeId === place.id) && 'active'}
                    onClick={ () => onPlaceClicked( place )}    
                >
                    <h6>{place.text}</h6>
                    <p 
                        //className="text-muted"
                        style={{
                            fontSize: '12px'
                        }}
                    >
                        {place.place_name}
                    </p>    
            
                    <button 
                        onClick={ () => getRoute(place)}
                        className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'} `} //"btn btn-outline-primary btn-sm"
                    >  
                        Direcciones
                    </button>
                </li>
            ))

        }
    </ul>
  )
}
