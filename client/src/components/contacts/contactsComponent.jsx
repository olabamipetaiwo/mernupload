import React,{Fragment,useContext,useEffect} from 'react';
// import { Link }  from 'react-router-dom';
import ContactItem from './contactItemComponent';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Contacts =() => {
    const authContext = useContext(AuthContext);
    const {user,token} = authContext;
    const contactContext = useContext(ContactContext);
    const {contacts,filtered} = contactContext;
    const t = "tee";
    const d = "dee";


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
                            <ContactItem key={index} contact={contact} />
                        )):
                        contacts.map((contact,index) => (
                          <ContactItem key={index} contact={contact} />
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
