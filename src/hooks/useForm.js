import { useState } from 'react'

//resive un objeto: campos del formulario, pueden ser varios
export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    //establece el valor por defeto que se envia desde las props
    const resetInputsValues = () => {
        setValues( initialState );
    }

    // function que resive el campo como tal ej, <input>
    const handleInputChangue = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    } 

    // retorna los valores u la funcion para que los valores del los input cambien.
    return [ values, handleInputChangue, resetInputsValues ];

}