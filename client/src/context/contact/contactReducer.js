import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER
 } from '../types';

export default(state,action) => {
    switch(action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts : [...state.contacts, action.payload]
        }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts : state.contacts.filter((contact) => {
                    return contact.id !== action.payload
                })
        }
        case UPDATE_CONTACT:
        return {
            ...state,
            contacts:state.contacts.map((contact,index) => {
                return contact.id ==action.payload.id ? action.payload : contact
            }),
            currentSet:false
         }
        case SET_CURRENT: 
        return {
            ...state,
            currentContact: state.contacts.filter((contact) => {
                return contact.id === action.payload
            }),
            currentSet:true
        }
        case CLEAR_CURRENT: 
        return {
            ...state,
            currentContact:null,
            currentSet:false
        }
        case FILTER_CONTACTS:
        return {
            ...state,
            filtered:state.contacts.filter((contact) => {
                const regEx = new RegExp(`${action.payload}`, 'gi');
                return contact.name.match(regEx) || contact.email.match(regEx);
            })
        }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered:null,
        }
    }
}