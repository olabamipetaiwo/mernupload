import React,{Fragment} from 'react';
import { Link }  from 'react-router';


const NavBar =() => {
  return (
    <Fragment>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="l.com">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                   <a className="nav-item nav-link active" href="ww.fb.com">Home</a>
                   <a className="nav-item nav-link active" href="ww.fb.com">About</a>
              </div>
           </div>
</nav> 
    </Fragment>
  );
}

export default NavBar;
