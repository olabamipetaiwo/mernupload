import React,{Fragment,useContext} from 'react';
// import { Link }  from 'react-router-dom';
import ContactItem from './contactItemComponent';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

import ContactContext from '../../context/contact/contactContext';
import ContactsFilter from '../contacts/contactsFilterComponent';

const Contacts =() => {
    const contactContext = useContext(ContactContext);
    const {contacts,filtered} = contactContext;

    if(contacts.length === 0) {
      return <h4 className="text-primary">Please add a contact</h4>
    }else {
      return (
        <Fragment>
          <TransitionGroup>
            <ContactsFilter />
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
                    { filtered != null ? filtered.map((contact,index) => {
                         return <CSSTransition key={contact.id} timeout={300} classNames="item"> 
                                     <ContactItem key={index} contact={contact} />
                                 </CSSTransition>
                    }) : contacts.map((contact,index) => {
                      return  <CSSTransition key={contact.id} timeout={300} classNames="item"> 
                                    <ContactItem key={index} contact={contact} />
                              </CSSTransition>
                    }) } 
                  
                    </tbody>
                  </table>
              </TransitionGroup>
        </Fragment>
      );
    }

}

export default Contacts;
