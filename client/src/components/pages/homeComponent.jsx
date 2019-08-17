import React,{Fragment} from 'react';
import Contacts from "../contacts/contactsComponent";
import ContactForm from "../contacts/contactFormComponent";
// import { Link }  from 'react-router-dom';


const Home =() => {
  return (
    <Fragment>
       <div className="row">
         <div className="col-sm-9">
             <Contacts />
         </div>
         <div className="col-sm-3">
            <ContactForm />
         </div>
         
       </div>
    </Fragment>
  );
}

export default Home;
