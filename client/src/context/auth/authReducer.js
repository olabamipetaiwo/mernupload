import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
 } from '../types';

export default(state,action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                loading:false,
                errFlag:false,
                user:action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('user',action.payload.id);
            return {
                ...state,
                token:action.payload.token,
                isAuthenticated:true,
                loading:true,
                errFlag:false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                token:null,
                isAuthenticated:false,
                loading:true,
                user:null,
                error:action.payload,
                errFlag:true
           }
        case LOGOUT:
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return {
                    token:null,
                    isAuthenticated:false,
                    loading:false,
                    user:null
               }
        case CLEAR_ERRORS:
            return {
                   ...state,
                   error:null,
                   errFlag:false
               }
        default:
            return state;
    }
}