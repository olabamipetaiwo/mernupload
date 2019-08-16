import React,{Fragment,useState} from 'react'

const contactFormComponent = () => {

    const {contact,setContact} = useState({
        name:'',
        email:'',
        phone:'',
        type:''
    });

    const onChange = () =>  {

    };

    const handleSubmit = () => {

    };


    return (
        <div classNameName="row">
            <form onSubmit={handleSubmit} method="post">
               <div className="form-group">
                    <label for="email">Email address:</label>
                    <input 
                         type="email" 
                         className="form-control" 
                         value={email}
                         onChange={onChange} />
                </div>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input 
                        type="name"
                        className="form-control" 
                        value={name}
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <h6>Contact Type</h6>
                    <input
                       type="radio" 
                       className="form-control"
                       value="personal"
                       checked={type === 'personal'} /> Personal {''}

                    <input
                       type="radio" 
                       className="form-control"
                       value="professional"
                       checked={type === 'professional'} /> Professional{''}


                </div>
                
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </div>
    )
}

export default contactFormComponent
