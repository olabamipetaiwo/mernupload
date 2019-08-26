import React,{Fragment,useContext,useState,useEffect} from 'react';
import AlertContext from  '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {alerts,setAlert,removeAlert} = alertContext;
    const {logIn,error,errFlag,clearErrors,isAuthenticated,loadUser} = authContext;


    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }else {
            if(errFlag) {
                setAlert(error,'danger');
                clearErrors();
            }
        }
       
        //eslint-disable-next-line
    },[error,isAuthenticated,props.history]);

    const [user,setUser] = useState({
        email:'',
        password:''
    });

    const {email,password} =user;

    const onChange = (e) =>  {
        setUser({
            ...user,
             [e.target.name]:e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email == '' || password == '') {
            setAlert("Please enter all fields",'danger');
        }else {
           logIn(user)
        }
    };

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                    <form onSubmit={handleSubmit} method="post">
                        <div className="form-group">
                                <label htmlFor="email">Email address:</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    className="form-control" 
                                    value={email}
                                    onChange={onChange} required />
                            </div>
                        

                            <div className="form-group">
                                <label htmlFor="name">Password</label>
                                <input 
                                    type="password"
                                    name="password"
                                    className="form-control" 
                                    value={password}
                                    onChange={onChange} minLength="6" required />
                            </div>

                        
                            <button type="submit" className="btn btn-primary btn-sm">
                                Login
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
