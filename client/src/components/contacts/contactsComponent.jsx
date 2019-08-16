import React,{Fragment,useContext} from 'react';
import { Link }  from 'react-router-dom';
import ContactItem from './contactItemComponent';

import ContactContext from '../../context/contact/contactContext';

const Contacts =() => {
    const contactContext = useContext(ContactContext);
    const {contacts} = contactContext;

  return (
    <Fragment>
          <table class="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Email</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {contacts.map( (contact,index) => {
                    return  <ContactItem contact={contact} />
                 }
                )}
                </tbody>
              </table>
           
    </Fragment>
  );
}

export default Contacts;
