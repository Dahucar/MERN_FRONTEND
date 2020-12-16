import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleShowModal = () => {
        dispatch( uiOpenModal() );
    }

    return (
        <button className="btn btn-primary fab" onClick={ handleShowModal }>
            <i className="fas fa-plus"></i>
        </button>
    )
}
