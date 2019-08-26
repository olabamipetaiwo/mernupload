import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import Axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {
    LOAD_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    CONTACT_FAIL,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from  '../types';

const ContactState = (props) => {
    const initialState = {
        contacts:[],
        currentContact:{
            id:'',
            name:'',
            email:'',
            phone:'',
            type:''
        },
       // currentContact:{},
        currentSet:false,
        filtered:null,
        contactError:null,
        contactErrorFlag:false
    };

    const [state,dispatch] = useReducer(ContactReducer,initialState);

    //Load COntacts
    const loadContacts = async (userId) => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

       try {
        const res = await Axios.get("http://localhost:5000/api/contact/"+userId); 
        dispatch({
            type:LOAD_CONTACTS,
            payload:res.data.contacts
        });
       }catch(err) {
           console.log("get contaact failed");
           console.log("respinse",err.response);
            dispatch({
                type:CONTACT_FAIL,
                payload:err
            });
       } 
    }

    //Clear Contacts
    const clearContacts = () => {
        dispatch({
            type:CLEAR_CONTACTS
        })
    }

    //Add Contacts
    const addContact = async (contact) => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

       try {
        const res = await Axios.post('http://localhost:5000/api/contact',contact);
        dispatch({
            type:ADD_CONTACT,
            payload:res.data.contact
        });
       }catch(err) {
           console.log("add contaact failed");
           console.log("respinse",err.response);
            dispatch({
                type:CONTACT_FAIL,
                payload:err.response.data.msg
            });
       }   
    };

    //Delete Contact
    const deleteContact =async (id) => { 
        try {
            const res = await Axios.delete("http://localhost:5000/api/contact/"+id);
            dispatch({
                type:DELETE_CONTACT,
                payload:res.data.contact
            });
           }catch(err) {
               console.log("delete contaact failed");
               console.log("respinse",err.response);
                dispatch({
                    type:CONTACT_FAIL,
                    payload:err
                });
           }      
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
    const updateContact = async (id,contact) => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
       
       try {
        const res = await Axios.patch("http://localhost:5000/api/contact/"+id,contact); 
        console.log(id," identifies: ", res.data.contact)
        dispatch({
            type:UPDATE_CONTACT,
            payload:res.data.contact
        });
       }catch(err) {
           console.log("update contaact failed");
           console.log("respinse",err.response);
            dispatch({
                type:CONTACT_FAIL,
                payload:err
            });
       }
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
                contactError:state.contactError,
                contactErrorFlag:state.contactErrorFlag,
                addContact:addContact,
                deleteContact:deleteContact,
                setCurrent:setCurrent,
                clearCurrent:clearCurrent,
                updateContact:updateContact,
                filterContacts:filterContacts,
                clearFilter:clearFilter,
                loadContacts:loadContacts,
                clearContacts:clearContacts
            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;