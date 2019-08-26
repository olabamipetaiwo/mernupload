import React,{Fragment,useContext,useState,useEffect  } from 'react'
import AlertContext from  '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {alerts,setAlert,removeAlert} = alertContext;
    const {registerUser,error,errFlag,clearErrors,isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }
        if(errFlag) {
            setAlert(error,'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    },[error,isAuthenticated,props.history]);

    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name,email,password,password2} =user;

    const onChange = (e) =>  {
        setUser({
            ...user,
             [e.target.name]:e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name == '' || email == '' || password == '') {
            setAlert("Please enter all fields",'danger');
        }else if(password != password2) {
            setAlert("password do not match",'danger');
        }else {
            registerUser({
                name,
                email,
                password
            });
           // setAlert("Registrartion Succesfull",'success');
           // console.log(user);
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
                                    <label htmlFor="name">Name</label>
                                    <input 
                                        type="name"
                                        name="name"
                                        className="form-control" 
                                        value={name}
                                        onChange={onChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Password</label>
                                    <input 
                                        type="password"
                                        name="password"
                                        className="form-control" 
                                        value={password}
                                        onChange={onChange} minLength="6" autoComplete="on" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Confirm Password</label>
                                    <input 
                                        type="password"
                                        name="password2"
                                        className="form-control" 
                                        value={password2}
                                        onChange={onChange} minLength="6" autoComplete="on" required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Register
                                </button>

                            </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register;
