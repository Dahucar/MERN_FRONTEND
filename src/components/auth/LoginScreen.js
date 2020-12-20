import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChanges ] = useForm({
        lEmail: 'danielhuenul90@gmail.com',
        lPassword: '12345678'
    });

    const [ formRegisterValues, handleRegisterInputChanges ] = useForm({
        rName: 'Daniel',
        rEmail: 'danielhuenul90@gmail.com',
        rPassword1: '12345678',
        rPassword2: '12345678'
    });

    const { lEmail, lPassword } = formLoginValues;
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    const handleSumitLogin = ( e ) => {
        // Deberia de aplicar validacion.
        e.preventDefault();
        console.log(formLoginValues);

        // tengo que crear el caso en mu reducer
        // crear la accion (asincrona)
        // disparar la accion 
        dispatch( startLogin( lEmail, lPassword ) );
        // aplicar el formato que recive el backend

    }

    const handleSubmitRegister = ( e ) => {
        // Deberia de aplicar validacion.
        e.preventDefault();
        if ( rPassword1 !== rPassword2 ) {
            return Swal.fire('Error', 'Las contraseñas deben ser iguales.', 'error');            
        }
        console.log(formRegisterValues);

        // tengo que crear el caso en mu reducer
        // crear la accion (asincrona)
        // disparar la accion 
        dispatch( startRegister( rEmail, rPassword1, rName ) );
        // aplicar el formato que recive el backend

    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleSumitLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChanges }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChanges }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleSubmitRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChanges }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChanges }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChanges } 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChanges } 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
