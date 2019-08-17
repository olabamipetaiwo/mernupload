import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from  '../types';

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id:1,
                name:"olabamipe Taiwo",
                email:"teeola48@gmail.com",
                phone:"08134562390",
                type:"Personal"
            },
            {
                id:2,
                name:"olabamipe kenny",
                email:"keola48@gmail.com",
                phone:"08152394540",
                type:"Personal"
            },
            {
                id:3,
                name:"Zach Olaimolu",
                email:"futanet48@gmail.com",
                phone:"08089456230",
                type:"Personal"
            }
        ],
        currentContact:{
            id:'',
            name:'',
            email:'',
            phone:'',
            type:''
        },
       // currentContact:{},
        currentSet:false,
        filtered:null
    };

    const [state,dispatch] = useReducer(ContactReducer,initialState);

    //Add Contacts
    const addContact = (contact) => {
        contact.id = Math.random();  
        dispatch({
            type:ADD_CONTACT,
            payload:contact
        });
    };

    //Delete Contact
    const deleteContact = (contactId) => {  
        dispatch({
            type:DELETE_CONTACT,
            payload:contactId
        });
    };


    //set Current
    const setCurrent = (contactId) => {
        dispatch({
            type:SET_CURRENT,
            payload:contactId
        });
    }

     //clear current
     const clearCurrent = () => {
        dispatch({
            type:CLEAR_CURRENT
        });
    }



    //Update Contact
    const updateContact = (contact) => {
        dispatch({
            type:UPDATE_CONTACT,
            payload:contact
        });
    }

    //Filter Contacts
    const filterContacts = (keyword) => {
        dispatch({
            type:FILTER_CONTACTS,
            payload:keyword
        });
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({
            type:CLEAR_FILTER
        });
    }

   
    return (
        <ContactContext.Provider
            value = {{
                contacts:state.contacts,
                currentContact:state.currentContact,
                currentSet:state.currentSet,
                filtered:state.filtered,
                addContact:addContact,
                deleteContact:deleteContact,
                setCurrent:setCurrent,
                clearCurrent:clearCurrent,
                updateContact:updateContact,
                filterContacts:filterContacts,
                clearFilter:clearFilter
            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;