import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch( startChecking() );
    }, [ dispatch ]);

    if ( checking ) {
        return (
            <h1>Estamos cargando.</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>

                    {/* Si checking esta a true. Es por que estoy sin logear */}
                    <PublicRoute 
                        isAuthenticated={ !!user }
                        exact path="/login"
                        component={ LoginScreen }
                    />

                    {/* Si checking esta a false. Es por que estoy logeado */}
                    <PrivateRoute
                        isAuthenticated={ !!user }
                        exact path="/"
                        component={ CalendarScreen }
                    />

                    {/* <Route exact path="/login" component={ LoginScreen } /> */}
                    {/* <Route exact path="/" component={ CalendarScreen } /> */}
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
