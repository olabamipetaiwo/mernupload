import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import uuid from 'uuid';

import {
    SET_ALERT,
    REMOVE_ALERT
} from  '../types';

const AlertState = (props) => {

    const initialState = [];

    const [state,dispatch] = useReducer(AlertReducer,initialState);

    // Set Alert
    const setAlert = (msg,type,timeout=6000) => {
        const id = uuid.v4();
        dispatch({
            type:SET_ALERT,
            payload:{
                id:id,
                type:type,
                msg:msg
            }
        });

        setTimeout(() => {
            dispatch({
                type:REMOVE_ALERT,
                payload:id
            });
        },timeout);
    }

    // Remove Alert
    const removeAlert = (id) => {
        dispatch({
            type:REMOVE_ALERT,
            payload:id
        });
    }
   
    return (
        <AlertContext.Provider
            value = {{
                alerts:state,
                setAlert:setAlert,
                removeAlert:removeAlert
            }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;