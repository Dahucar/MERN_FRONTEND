import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvento";
import { types } from "../types/types";

export const eventStartAddNew = ( event ) => {
    return async ( dispatch, getState ) => {
        const { uid, name } = getState().auth;
        try {
            //usar fetch con token para tener acceso al usuario
            const resp = await fetchConToken( 'events', event, 'POST' );
            const body = await resp.json();
            // si se guardo el evento. voy a usar los datos del evento que llega por parametro para mostrarlo en el calendario.
            if ( body.ok ) {
                // agrego los datos necesarios al avento.
                event.id = body.eventoGuardado.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch( eventAddNew( event ) );
            }
        } catch (error) {
            Swal.fire('Error.', 'Error durante el proceos de guardado de evento', 'error');
            console.log( error );
        }
    }
}

export const eventSatrtLoading = () => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();
            const events = prepareEvents(body.eventos);
            dispatch( eventLoaded(events) );
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Error al obtener el listado eventos', 'error');
        }
    }
}

export const eventStratUpdate = ( event ) => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchConToken( `events/${ event.id }`, event, 'PUT' );
            const body = await resp.json();
            if ( body.ok ) {
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Error al actualizar evento', 'error');
        }
    }
}

export const eventStartDelete = () => {
    return async ( dispatch, getState ) => {
        const { activeEvent } = getState().calendar;
        try {
            const resp = await fetchConToken( `events/${ activeEvent.id }`, {}, 'DELETE' );
            const body = await resp.json();
            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Error al eliminar evento', 'error');
        }
    }
}

const eventLoaded = ( events ) => ({
    type: types.eventLoaded,
    payload: events
})

const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
})

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
})

const eventDeleted = () => ({
    type: types.eventDeleted,
})

