import React ,{Fragment,useState} from 'react';
import './App.css';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App =() => {
  const [selectedFile,setSelectedFile] = useState(null);
  const [loaded,setLoaded] = useState(0)

  const maxSelectFile=(event)=>{
    let files = event.target.files 
      if (files.length > 3) { 
           const msg = 'Only 3 images can be uploaded at a time'
           event.target.value = null;
           toast.error(msg);
           return false;
      }
    return true;
 }

 const checkMimeType=(event)=>{
      let files = event.target.files 
      let err = '';
      const types = ['image/png', 'image/jpeg', 'image/gif']
      for(var x = 0; x < files.length; x++) {
        if (types.every(type => files[x].type !== type)) { 
          err += files[x].type+' is not a supported format\n';
        }
      };

      if (err !== '') {  
          event.target.value = null;
          toast.error(err)
          return false; 
      }
     
    return true;

  }

  const checkFileSize=(event)=>{
      let files = event.target.files;
      console.log(files[0]);
      let size = 5188690048550;//Modify thus to restrict file size
      let err = ""; 
      for(var x = 0; x < files.length; x++) {
        if (files[x].size > size) {
          err += files[x].name+'is too large, please pick a smaller file\n';
        }
      };
      if (err !== '') {
          event.target.value = null;
          toast.error(err);
          return false;
      }

    return true;
  }


  const onChangeHandler=(event) =>{
    //single files
    // console.log(event.target.files[0]);
    // setSelectedFile(event.target.files[0]);
    // setLoaded(0);
    //Multiple Files
    if(maxSelectFile(event) && checkMimeType(event)  && checkFileSize(event)) {
      setSelectedFile(event.target.files);
      setLoaded(0);
    }
  }

  const onClickHandler = () => {
    const data = new FormData() 
    // data.append('file',selectedFile);

     for(var x = 0; x<selectedFile.length; x++) {
       data.append('file',selectedFile[x]);
     }

    axios.post("http://localhost:5000/api/upload/", data, { 
        // receive two parameter endpoint url ,form data 
        onUploadProgress: ProgressEvent => {
          setLoaded(ProgressEvent.loaded / ProgressEvent.total*100)
        }
      })
      .then(res => { 
        toast.success('upload success')
      })
      .catch(err => { 
        
          console.log("error occured",err.message)
          toast.error('upload fail')
      })
  }

  return (
    <Fragment>
     <div className="container">
      	<div className="row">
            <div className="col-md-6">
                <form encType="multipart/form-data" method="post" action="#" id="#">   
                <div className="form-group">
                    <ToastContainer />
                </div>
                      <div className="form-group files color">
                        <label>Upload Your File </label>
                        <input type="file" 
                               className="form-control"
                               multiple
                               name="file" onChange={onChangeHandler}/>
                      </div>
                      
                      <button type="button"
                              className="btn btn-success btn-block" 
                              onClick={onClickHandler}>Upload</button> 
                  </form> 

                  <div className="form-group">
                            <Progress max="100"
                                     color="success" 
                                     value={loaded} >{Math.round(loaded,2) }%</Progress>
                  </div>
            </div>
          </div>
        </div>
    </Fragment>

  );
}

export default App;
