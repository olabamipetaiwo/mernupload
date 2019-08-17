import React,{Fragment,useContext} from 'react';
import PropTypes  from 'prop-types';
import ContactContext from '../../context/contact/contactContext';


const ContactItemComponent = ({contact}) => {
    const contactContext = useContext(ContactContext);
    const {deleteContact,editContact,setCurrent} = contactContext;

    const handleDelete = (e) => {
        e.preventDefault();
        deleteContact(id);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setCurrent(id);
    };

    const {id,name,email,type } = contact;

    return (
        <Fragment>
                    <tr>
                        <td>{name}</td>
                        <td>{ type.charAt(0).toUpperCase() + type.slice(1) }</td>
                        <td>{email}</td>
                        <td>
                            <button onClick={handleEdit}  className="btn btn-success btn-sm">Edit</button>
                            <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
        </Fragment>
    )
}

ContactItemComponent.propTypes = {
  contact:PropTypes.object.isRequired
};

export default ContactItemComponent;
