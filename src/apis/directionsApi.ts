

import axios from "axios";


const directionsApi = axios.create({

    //baseURL: 'https://api.maptiler.com/geolocation/ip.json?key=EaUzllHlNxi22U4bOfIt',
    //https://api.maptiler.com/geocoding/ip.json?key=EaUzllHlNxi22U4bOfIt

    baseURL: 'https://api.maptiler.com/geocoding', 

    params:{
        
        key: 'EaUzllHlNxi22U4bOfIt',  //access_token

        //params que requiere mapbox
/*      alternatives: false,
        geometries: 'geojson',
        overview:'simplified',
        steps: false,
        access_token: 'EaUzllHlNxi22U4bOfIt'
*/
    }
})

export default directionsApi;

