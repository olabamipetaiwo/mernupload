import React ,{Fragment} from 'react';
import { BrowserRouter as Router,Switch,Route}  from 'react-router-dom';
import NavBar from './components/layout/navbarComponent';
import NotFound from './components/layout/notFoundComponent';
import Alerts from './components/layout/alertsComponent';
import Home from './components/pages/homeComponent';
import Register from './components/auth/registerComponent';
import Login from './components/auth/loginComponent';
import setAuthToken from '../src/utils/setAuthToken';
import PrivateRoute from '../src/components/routing/privateRouteComponent'


//import context providers
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App =() => {
  return (
     <AuthState>
       <ContactState>
          <AlertState>
              <div className="container-fluid">
                  <Router>
                          <Fragment>
                            <NavBar />
                             <Alerts />
                              <Switch>
                                  <PrivateRoute exact path="/" component={Home}/> 
                                  <Route exact path="/register" component={Register}/> 
                                  <Route exact path="/login" component={Login}/> 
                                  <Route component={NotFound} />
                              </Switch>
                        </Fragment>
                  </Router>
              </div>
          </AlertState>
       </ContactState>
     </AuthState>
  );
}

export default App;
