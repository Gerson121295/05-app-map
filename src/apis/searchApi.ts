
import axios from "axios";


const searchApi = axios.create({

    //baseURL: 'https://api.maptiler.com/geolocation/ip.json?key=EaUzllHlNxi22U4bOfIt',
    //https://api.maptiler.com/geocoding/ip.json?key=EaUzllHlNxi22U4bOfIt

    baseURL: 'https://api.maptiler.com/geocoding', 

    params:{
        limit: 5,
        //Language: 'es',
        key: 'EaUzllHlNxi22U4bOfIt'  //access_token
    }
})

export default searchApi;

