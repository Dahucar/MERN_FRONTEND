// host del backend obtenido desde el archivo .env
const baseUrl = process.env.REACT_APP_API_URL;

/**
 * 
 * @argument endpoint es la ruta a la que voy a solicitar acceso
 * @argument data es un Objecto donde voy a enviar todos los datos necesarios al backend EJ. { name: "Daniel" }
 * @argument method es el metodo que voy a usar. Por defecto voy usar get
 */
export const fetchSinToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }/`;
    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

export const fetchConToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }/`;
    // Obtenfo el token del localStorage
    const token = localStorage.getItem('token') || '';
    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}