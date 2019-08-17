import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT
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
        case SET_CURRENT: 
        return {
            ...state,
            currentContact: state.contacts.filter((contact) => {
                return contact.id === action.payload
            }),
            currentSet:true
        }
    }
}