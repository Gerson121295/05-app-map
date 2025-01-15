import { Map, Marker } from "@maptiler/sdk";
import { createContext } from "react";


interface MapContextProps {
    isMapReady: boolean;
    map?: Map; //map de tipo Map de maptiler o el provedor del Mapa
    markers: Marker[]; //un arreglo de marcadores Marker viene de maptiler
    
    //Methods
    setMap: (map: Map) => void,
    getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps);
