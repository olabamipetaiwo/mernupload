import React,{useContext,useState,useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const {addContact,currentContact,currentSet} = contactContext;

    const [contact,setContact] = useState({
        id:'',
        name:'',
        email:'',
        phone:'',
        type:'personal'
    });

    useEffect(() => {
        if(currentSet ) {
            setContact(currentContact[0]);
        }else {
            setContact({
                id:'',
                name:'',
                email:'',
                phone:'',
                type:'personal'
            });
        }
    },[currentSet,currentContact]);

   

    const {name,email,phone,type} = contact;

    const onChange = (e) =>  {
        setContact({
            ...contact,
             [e.target.name]:e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact(contact);
        setContact({
            name:'',
            email:'',
            phone:'',
            type:''
        });
    };

    const clearForm =() => {
        setContact({
            name:'',
            email:'',
            phone:'',
            type:''
        });
    }

    return (
        <div className="row">
            <h4 
                className="text-center">
                {currentSet ? 'Update Contact' : 'Add Contact'}
            </h4>

            <form onSubmit={handleSubmit} method="post">
               <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input 
                         type="email" 
                         name="email"
                         className="form-control" 
                         value={email}
                         onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="name"
                        name="name"
                        className="form-control" 
                        value={name}
                        onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Phone</label>
                    <input 
                        type="number"
                        name="phone"
                        className="form-control" 
                        value={phone}
                        onChange={onChange} />
                </div>

                <h6>Contact Type</h6>

                    <input
                       type="radio" 
                       name="type"
                       className="form-control"
                       value="personal"
                       onChange = {onChange}
                       checked={type === 'personal'} /> {' '}
                        Personal

               
                    <input
                       type="radio" 
                       name="type"
                       className="form-control"
                       value="professional"
                       onChange = {onChange}
                       checked={type === 'professional'} /> {' '} 
                       Professional
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                       {currentSet ? 'Update Contact' : 'Add Contact'}
                    </button>

                    <button onClick={clearForm} type="submit" className="btn btn-danger">
                        Clear
                    </button>
                </div>
               
            </form>
        </div>
    )
}

export default ContactForm;
