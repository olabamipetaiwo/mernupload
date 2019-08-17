import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
    ADD_CONTACT
} from  '../types';

const ContactState = (props) => {

    const initialState = {
       
    };

    const [state,dispatch] = useReducer(AuthReducer,initialState);
   
    return (
        <ContactContext.Provider
            value = {{
               
            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default AuthState;