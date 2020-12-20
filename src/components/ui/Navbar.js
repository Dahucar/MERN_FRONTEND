import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                MERN - Practica | { user.name }
            </span>
            <button className="btn btn-outline-danger" onClick={ handleLogout } >
                <span className="mr-1">Salir</span>
                <i className="fas fa-sign-out-alt"></i>
            </button>
        </div>
    )
}
