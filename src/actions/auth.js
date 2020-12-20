import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin =  ( email, password ) => {
    return async ( dispatch ) => {
        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();
        if ( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( authLogin({
                uid: body.usuario._id,
                name: body.usuario.name
            }));
            Swal.fire('Exito', 'Inicio de sesión correcto, Token Guardado.', 'success');
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startRegister = ( email, password, name ) => {
    return async ( dispatch ) => {
        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();
        if ( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( authLogin({
                uid: body.user._id,
                name: body.user.name
            }));
            Swal.fire('Exito', 'Inicio de sesión correcto. Token guardado.', 'success');
        }else{
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

// verificar el token de usuario.
export const startChecking = () => {
    return async ( dispatch ) => {
        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();
        if ( body.ok ) {
            localStorage.setItem('token', body.nuevoToken);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( authLogin({
                uid: body.user.uid,
                name: body.user.name
            }));
            Swal.fire('Exito', 'Inicio de sesión correcto', 'success');
        }else{
            // Swal.fire('Error', body.msg, 'error');
            // si el token no es correcto, será redireccionado al /login
            dispatch( checkingFinish() );
        }
    }
}

// IMPONTANTE: esta accion usa el callback donde mediante el disparch voy a "limpiar" mi reducer. de forma que los datos 
// del usuario se eliminen, por ende del localStorage igualmente.
// DATO: La limpieza del localStorage es definida aquí debido a que dentro de mi reducer no deben de haber logica 
// con posiblidad de fallos. Alli todo lo definido debe ser a prueba de error,
export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( logout() );
    }
}

export const checkingFinish = () => ({
    type: types.authCheckingFinish
})

// establece en el reducer los datos del usuario.
export const authLogin = ( user ) => ({
    type: types.authStartLogin,
    payload: user
})

const logout = () => ({
    type: types.authLogout
})