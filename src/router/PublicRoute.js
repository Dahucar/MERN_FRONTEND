import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route { ...rest } 
            component={ (props) => (
                // Evalua: si no esta autenticado. en ese caso muestra el login
                ( !isAuthenticated )
                    ? <Component { ...props } />
                    // si esta autenticado niega el login y envia al "/"
                    : ( <Redirect to="/" /> )
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
