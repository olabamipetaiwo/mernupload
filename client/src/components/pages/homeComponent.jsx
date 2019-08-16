import React,{Fragment} from 'react';
import Contact from "../contacts/contactsComponent";
// import { Link }  from 'react-router-dom';


const Home =() => {
  return (
    <Fragment>
       <div className="row">
         <div className="col-sm-9">
             <Contact />
         </div>
         <div className="col-sm-3">
            {/* form */}
         </div>
         
       </div>
    </Fragment>
  );
}

export default Home;
