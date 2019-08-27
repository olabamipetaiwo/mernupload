import React,{Fragment,useContext,useEffect} from 'react';
import Contacts from "../contacts/contactsComponent";
import ContactForm from "../contacts/contactFormComponent";
import ContactsFilter from '../contacts/contactsFilterComponent';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Home =() => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const {token,isAuthenticated,loadUser,user,loading} = authContext;
  const {contacts,loadContacts} = contactContext;
  let loggedUserId = localStorage.getItem('user');

 
   useEffect(() => {  
     loadUser();
  },[]);

  useEffect(() => {
     loadContacts(loggedUserId)
  },[]);

  const mainDiv = (
      <Fragment>
        <div className="row">
        <h2  className="mb2 text-primary text-center">Welcome {(user != null) ? user.email : 'WebsiteUser'}</h2>
          <div className="col-sm-9">
              <ContactsFilter />
              <Contacts />
          </div>
          <div className="col-sm-3">
            <ContactForm />
          </div>
          
        </div>
    </Fragment>
  );

  const prepDiv =(
      <Fragment>
        <div className="row">
        <h2  className="mb2 text-primary text-center">Welcome {(user != null) ? user.email : 'WebsiteUser'}</h2>
          <div className="col-sm-6">
         
            <ContactForm />
          </div>   
        </div>
    </Fragment>
  );

  return (
    <div>
         { (user != null) ? mainDiv : prepDiv}
    </div>
  );
}

export default Home;
