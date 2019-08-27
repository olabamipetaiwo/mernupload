import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import Axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from  '../types';

const AuthState = (props) => {

    const initialState = {
       token:localStorage.getItem('token'),
       isAuthenticated:false,
       user:null,
       loading:false,
       error:null,
       errFlag:false
    };

    const [state,dispatch] = useReducer(AuthReducer,initialState);
    

    //Load User
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
       try {
        const res = await Axios.get('http://localhost:5000/api/auth');
        dispatch({
            type:USER_LOADED,
            payload: res.data.user
        }); 
       }catch(err) {
        dispatch({
            type:AUTH_ERROR
        }); 
       }
    }

    //register user
    const registerUser = async (user) => {

        try {
            const res = await Axios.post('http://localhost:5000/api/user',user);
            console.log("register user success");
            dispatch({
                type:REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch(err) {
            console.log("axios sending  error message");
            dispatch({
                type:REGISTER_FAIL,
                payload:err.response.data.msg
            });
        }
       
    }

    //login user
    const logIn = async (user) =>  {
        try {
            const res = await Axios.post('http://localhost:5000/api/auth',user);
            dispatch({
                type:LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch(err) {
            dispatch({
                type:LOGIN_FAIL,
                payload:err.response.data.msg
            });
        }
    }

    //logout
        const logOut = () => {
            dispatch({
                type: LOGOUT
            });
        }

    //clear errors
    const clearErrors= () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    }
   
    return (
        <AuthContext.Provider
            value = {{
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                loading:state.loading,
                user:state.user,
                error:state.error,
                errFlag:state.errFlag,
                registerUser,
                loadUser,
                logIn,
                logOut,
                clearErrors
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;