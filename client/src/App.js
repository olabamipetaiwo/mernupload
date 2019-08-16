import React ,{Fragment} from 'react';
import { BrowserRouter as Router,Switch,Route}  from 'react-router-dom';
import NavBar from './components/layout/navbarComponent';
import Footer from './components/layout/footerComponent';
import NotFound from './components/layout/notFoundComponent';
import Home from './components/pages/homeComponent';

//import contecxt providers
import ContactState from './context/contact/ContactState';


const App =() => {
  return (
    <ContactState>
        <div className="container-fluid">
            <Router>
                    <Fragment>
                        <NavBar />
                        <Switch>
                            <Route exact path="/" component={Home}/> 
                            <Route component={NotFound} />
                        </Switch>
                  </Fragment>
            </Router>
        </div>
      </ContactState>
  );
}

export default App;
