import React,{Fragment,useContext,useRef,useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactsFilterComponent = () => {
    
    const contactContext = useContext(ContactContext);
    const {contacts,filterContacts,clearFilter,filtered} = contactContext;
    const text = useRef('');

    useEffect(() => {
        if(filtered == null) {
            text.current.value  = "";      
        }
    });

    const onChange = (e) => {
        e.preventDefault();
        let keyword = e.target.value;
        if(keyword == '') {
            clearFilter();
        }else {
            filterContacts(keyword);
        }
    //    if( text.current.value !== '') {
    //     console.log("current value is : ",text.currrent.value);
    //     //    filterContacts(text.currrent.value);
    //    }else {
    //        clearFilter();
    //    }        
    }

    return (
        <Fragment>
            <div className="row">
                
             <form>
               <div className="form-group">
                    <input 
                         ref={text}
                         type="text"
                         name="searchWord" 
                         placeholder="Filter Contacts...."
                         className="form-control filter" 
                         onChange={onChange} />
                </div>
          </form>
        </div>
        </Fragment>
    )
}

export default ContactsFilterComponent ;
