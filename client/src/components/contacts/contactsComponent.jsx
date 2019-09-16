import React,{Fragment,useContext,useEffect} from 'react';
// import { Link }  from 'react-router-dom';
import ContactItem from './contactItemComponent';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';

const Contacts =() => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const {alerts,setAlert,removeAlert} = alertContext;
    const {user,token} = authContext;
    const contactContext = useContext(ContactContext);
    const {contactErrorFlag, contactError, clearContactErrors,contacts,filtered} = contactContext;

    useEffect(() => {
        if(contactErrorFlag) {
          setAlert(contactError,'danger');
          clearContactErrors();
        }
    },[contactError,contactErrorFlag]);


    if(contacts.length == 0) {
      return <h4 className="text-primary">Please add a contact</h4>
    }else {
      return (
        <Fragment>
          <TransitionGroup> 
              <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      filtered != null ?
                        filtered.map((contact,index) => (
                            <CSSTransition
                              key={contact.id}
                              timeout="300"
                              className="item">
                              <ContactItem key={index} contact={contact} />
                            </CSSTransition>
                        )):
                        contacts.map((contact,index) => (
                          <CSSTransition
                              key={contact.id}
                              timeout="300"
                              className="item">
                                    <ContactItem key={index} contact={contact} />
                              </CSSTransition>
                         ))
                    }
                    </tbody>
                    
                  </table>
                  
               </TransitionGroup>
        </Fragment>
      );
    }

}

export default Contacts;
