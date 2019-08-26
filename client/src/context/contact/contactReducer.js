import {
    LOAD_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    CONTACT_FAIL,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER
 } from '../types';

 let isEquivalent =require("../../functions/functions")

export default(state,action) => {
    switch(action.type) {
        case LOAD_CONTACTS:
            action.payload.map((contact) => {
            //     console.log("Api contact is: ",contact );
                state.contacts.push(contact)
            //     console.log("Inside Staet contact is",state.contacts);
            //     // state.contacts.map((stateContact) => {
            //     //     if(isEquivalent(stateContact,contact)) {
            //     //         console.log("This item is already inside state")
            //     //     }else {
            //     //         console.log("This item is not in state")
            //     //     }
            //     // });
            });
            return {
                ...state
            }
        case CLEAR_CONTACTS:
            state.contacts = [];
            return {
                ...state
            }
        case ADD_CONTACT:
            //state.contacts.push(action.payload);
            return {
                ...state,
                contacts : [...state.contacts, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts : state.contacts.filter((contact) => {
                    return contact._id !== action.payload
                })
        }
        case UPDATE_CONTACT:
        return {
            ...state,
            contacts:state.contacts.map((contact,index) => {
                return contact._id == action.payload._id ? action.payload : contact
            }),
            currentSet:false
         }
        case SET_CURRENT: 
            return {
                ...state,
                currentContact: state.contacts.filter((contact) => {
                    return contact._id === action.payload
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
        case CONTACT_FAIL:
            return {
               ...state,
               contactErrorFlag:true, 
               contactError:action.payload
            }
        default:
            return state
    }
}