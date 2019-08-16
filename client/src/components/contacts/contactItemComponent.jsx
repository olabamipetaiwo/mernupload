import React,{Fragment} from 'react';
import PropTypes  from 'prop-types'

const contactItemComponent = ({contact}) => {
    const {id,name,email,type } = contact;

    return (
        <Fragment>
                    <tr>
                        <td>{name}</td>
                        <td>{ type.charAt(0).toUpperCase() + type.slice(1) }</td>
                        <td>{email}</td>
                        <td>
                            <button class="btn btn-success btn-sm">Edit</button>
                            <button class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
        </Fragment>
    )
}

contactItemComponent.propTypes = {
  contact:PropTypes.object.isRequired
};

export default contactItemComponent
