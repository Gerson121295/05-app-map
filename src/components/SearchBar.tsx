import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context"
import { SearchResult } from './SearchResult';


export const SearchBar = () => {

    //Cuando la persona deje de escribir por cierto tiempo milesima de segundo se emite la accion
    const debounceRef = useRef<NodeJS.Timeout>() //si da error NodeJS.Timeout instalar: npm install --save-dev @types/node
    const { searchPlacesByTerm } = useContext(PlacesContext)


    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => { //para saber el tipo del event poner el mouse sobre onChange para saber el tipo: ChangeEvent<HTMLInputElement>
        
        if(debounceRef.current) //si actualmente debounceRef tiene algo lo borra con clearTimeout 
            clearTimeout(debounceRef.current);

        //si  debounceRef no tiene valor entonces
        debounceRef.current = setTimeout(() => {
          //console.log('debounced value:', event.target.value);

          searchPlacesByTerm(event.target.value);

        }, 1000 ); //1 segundo, si la persona deja de escribir por 1 segundo lanza la busqueda de lo escribido
    }

  return (
    <div className="search-container">
      <input 
        type="text" 
        className="form-control"
        placeholder="Buscar lugar..."
        onChange={ onQueryChanged }
        />

        <SearchResult/>
    </div>
  )

}


