import React,{ useState } from 'react'

import { ref as reference, push } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage,db } from '../../../firebase.config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import DisplayTable from './DisplayTable';
import './services.css';

const AdminServices = () => {
    const [addRowCollapsible, setAddRowCollapsible] = useState(false);
    const [editWindow, setEditWindow] = useState(false);
    const [serviceImageFont, setServiceImageFont] = useState("");
    const [serviceTitle, setServiceTitle] = useState("");
    const [serviceDetail, setServiceDetail] = useState("");
    const [image, setImage] = useState("");
    const refhook = React.useRef();
    

    const submitData = async(e) => {
        e.preventDefault();
        const storageRef = ref(storage, 'portfolio/images/' + image.name);
        uploadBytes(storageRef, image)
        .catch(error =>{
            console.log(error);
            toast.error("Error Occured during image uploading");
        })
        .then(() => {
            // fetching url of the uploaded storage image
            getDownloadURL(ref(storage, 'portfolio/images/' + image.name))
            .catch(error => { 
                console.log(error);
                toast.error("Error occured during url handling!..");
            })
            .then((url) => {
                // adding service data to firebase server
                push(reference(db, 'portfolio/services/',), {
                    serviceTitle: serviceTitle,
                    serviceDetail: serviceDetail,
                    serviceImageUrl: url,
                    serviceImageFont: serviceImageFont,
                });
            }).catch(error => {
                console.log(error);
                toast.error("Error occured during service data uploading!...");
            })
            .then(() =>{
                setServiceDetail("");
                setServiceImageFont("");
                setServiceTitle("");
                setImage("");
                refhook.current.value = "";
                toast.success("Hurray !!! Service added successfully !");
            })
        })
    }
    return (
        <>
        <ToastContainer/>
        <div className="container">
        {/* adding element */}
        <div className="main">
            <div className="addElement">
                <div className="addElementHeader"><p>Services List</p><button onClick={()=>setAddRowCollapsible(!addRowCollapsible)} className="collapsible">Add Service</button></div>
                <div className="content" style={{display: addRowCollapsible ? "flex" : "none" }}>
                    <div className="form_wrapper">
                        <div className="form_container">
                            <div className="title_container">
                                <h2>Add New Service</h2>
                            </div>
                            <div className="row">
                            {/* Add services form starts here */}
                                <form onSubmit={submitData}>
                                    <div className="form-row">
                                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                            <input type="text" name="title" placeholder="Title" value={serviceTitle} onChange={(e)=> setServiceTitle(e.target.value)}/>
                                        </div>
                                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                            <input type="text" name="image" placeholder="Image font url" value={serviceImageFont} onChange={(e)=>setServiceImageFont(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="input_field textarea_field"> <span><i aria-hidden="true" className="fa fa-book"></i></span>
                                            <textarea name="detail" rows="3" value={serviceDetail} onChange={(e)=> setServiceDetail(e.target.value)} placeholder="Service Detail"/>
                                        </div>
                                        <div className="input_field textarea_field">
                                            <input type="file"  ref={refhook} name="image" onChange={(e)=>setImage(e.target.files[0])}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <input className="button" type="submit" value="Add Service" />
                                    </div>
                                </form>
                                {/* Add services form ends here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DisplayTable editWindow={editWindow} setEditWindow={setEditWindow}/>  
        </div>
    </div> 
    </>
    )
}

export default AdminServices;
