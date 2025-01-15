

export const getUserLocation = async():Promise<[number, number]> => { //regresa una promesa que resuleve un tipo number, number

    return new Promise( (resolve, reject) => { //Promesa recibe 2 parametros; resolve si sale bien y reject por si da error

        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                resolve([coords.longitude, coords.latitude])
            },
            //Si sale mal la promesa
            (err) => {
                alert('No se pudo obtener la geolocalizacion');
                console.log(err);
                reject();
            }
        )
    })
} 

