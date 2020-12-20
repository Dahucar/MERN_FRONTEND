import { types } from "../types/types";

const initialState = {
    // cuando este este en true mostrare un loading...
    checking: true,
    // cuando se logee el usuario se añadira el name y uid
}

export const authReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.authStartLogin:
            return {
                ...state,    
                checking: false,
                user: action.payload,
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }
        
        case types.authLogout:
            return {
                checking: false
            }
            
        default:
            return state;
    }
}