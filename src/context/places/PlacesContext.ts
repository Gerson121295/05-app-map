import { createContext } from "react";
import { Feature } from "../../interfaces/places";


//El contexto es lo que se va proveer a los demas componentes

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];

  //Methods
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

export const PlacesContext =  createContext<PlacesContextProps>({} as PlacesContextProps); //createContext es de tipo PlacesContextProps


