import React,{Fragment,useContext,useEffect} from 'react';
// import { Link }  from 'react-router-dom';
import ContactItem from './contactItemComponent';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import ContactsFilter from './contactsFilterComponent';

const Contacts =() => {
    const authContext = useContext(AuthContext);
    const {user,token} = authContext;
    const contactContext = useContext(ContactContext);
    const {contacts,filtered} = contactContext;

    if(contacts.length === 0) {
      return <h4 className="text-primary">Please add a contact</h4>
    }else {
      return (
        <Fragment>
          <h2>Contacts Loaded</h2>
          {/* <TransitionGroup> */}
            {/* <ContactsFilter /> */}
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
                    {/* { filtered != null ? filtered.map((contact,index) => {
                         return <CSSTransition key={contact.id} timeout={300} classNames="item"> 
                                     <ContactItem key={index} contact={contact} />
                                 </CSSTransition>
                    }) : contacts.map((contact,index) => {
                      return  <CSSTransition key={contact.id} timeout={300} classNames="item"> 
                                    <ContactItem key={index} contact={contact} />
                              </CSSTransition>
                    }) }  */}
                    {/* contacts.map((contact,index) => {
                        return <ContactItem key={index} contact={contact} />
                    });   */}
                    </tbody>
                  </table>
                  {/* {contacts.map((contact,i) => {
                       return <p>{contact.email}</p>
                  })} */}
              {/* </TransitionGroup> */}
        </Fragment>
      );
    }

}

export default Contacts;
