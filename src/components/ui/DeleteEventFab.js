import React from 'react'
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/event';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleDeleteEvent = () => {
        dispatch( eventStartDelete() );
    }
    
    return (
        <button className="btn btn-danger fab-danger" onClick={ handleDeleteEvent }>
            <i className="fas fa-trash"></i>
        </button>
    )
}
