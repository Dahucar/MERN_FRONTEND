import moment from 'moment'
import { types } from '../types/types';

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Mi cumpleados',
        start: moment().toDate(),
        end: moment().add(2, 'days').toDate(),
        bgcolor: '#fafa',
        notes: 'Es mi cumpleaños',
        user: {
            _id: '123',
            name: 'Daniel'
        }
    }],
    activeEvent: null
}

export const calendarReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.eventAddNew:
            return {
                ...state,
                events: [ action.payload, ...state.events ]
            }

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                // Busco dentro de mi listado si un elemento coincide en el id, de ser el caso lo reemplaza
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                // Busco dentro de mi listado si un elemento coincide en el id del evento activo. en ese caso lo quito de la lista
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id ) 
                ),
                activeEvent: null
            }
    

        default:
            return state;
    }
}