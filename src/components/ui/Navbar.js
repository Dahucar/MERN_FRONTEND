import React from 'react';

export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                MERN - Practica
            </span>
            <button className="btn btn-outline-danger">
                <span className="mr-1">Salir</span>
                <i className="fas fa-sign-out-alt"></i>
            </button>
        </div>
    )
}
