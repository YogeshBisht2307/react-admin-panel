import React, { useState } from 'react';

import { ref as reference, update } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../../firebase.config';

import { toast } from 'react-toastify';

const EditTechStack = ({ editPopup, setEditPopup, currentEditItem, setCurrentEditItem, setLoader,setTechStackData }) => {
    const [editImage, setEditImage] = useState("");
    const refhook = React.useRef();

    const validateEditData = (editItem) => {
        if (editItem.tech_stackTitle === ""){
            toast.error("Invalid Title !");
            return false;
        }
        if (editItem.tech_stackCategory === ""){
            toast.error("Invalid Date !");
            return false;
        }
        return true;
    }


    const handletech_stackEditFormSubmit = (event)=>{
        event.preventDefault();
        setTechStackData([]);
        
        if (validateEditData(currentEditItem) !== true){
            return;
        }
        setLoader(true);
        
        if (editImage !== ""){
            const storageRef = ref(storage, 'images/tech_stacks/' + editImage.name);
            uploadBytes(storageRef, editImage)
            .catch(() =>{
                toast.error("Error Occured during image uploading");
            })
            .then(() => {
                // fetching url of the uploaded storage image
                getDownloadURL(ref(storage, 'images/tech_stacks/' + editImage.name))
                .catch(() => { 
                    setLoader(false);
                    toast.error("Error occured during url handling!..");
                })
                .then((url) => {
                    update(reference(db, 'portfolio/tech_stacks/' + currentEditItem.tech_stackKey), {
                        tech_stackTitle: currentEditItem.tech_stackTitle,
                        tech_stackCategory: currentEditItem.tech_stackCategory,
                        tech_stackImageUrl: url,
                    })
                    .then(() => {
                        setEditPopup(!editPopup);
                        setLoader(false);
                        toast.success("tech_stack updated 😎");
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error("Unable to update, try again later 😒");
                    });    
                })
            })
        }
        else {
            update(reference(db, 'portfolio/tech_stacks/' + currentEditItem.tech_stackKey), {
                tech_stackTitle: currentEditItem.tech_stackTitle,
                tech_stackCategory: currentEditItem.tech_stackCategory,
            })
            .then(() => {
                // update the tech_stackData
                setLoader(false);
                setEditPopup(!editPopup);
                toast.success("tech_stack updated 😎");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Unable to update, try again later 😒");
            });
        }
    }
    return (
        <div className="edit-content tech_stack" style={{display:editPopup ? "flex" : "none"}}>
            <div onClick={()=>setEditPopup(!editPopup)} className="cross">
                <i className="fa fa-times" aria-hidden="true"></i>
            </div>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>Update tech_stack</h2>
                    </div>
                    <div className="row">
                        <form onSubmit={handletech_stackEditFormSubmit}>
                            <div className="form-row">
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                    <input type="text" name=""
                                        value={currentEditItem.tech_stackTitle} 
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem,
                                                tech_stackTitle: e.target.value 
                                            })
                                        }  
                                        placeholder="tech_stack Title" 
                                    />
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                    <input type="text" name=""
                                        value={currentEditItem.tech_stackCategory}
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem, 
                                                tech_stackCategory: e.target.value 
                                                }
                                            )} 
                                        placeholder="tech_stack Date" 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input_field">
                                    <input type="file" 
                                        name="editImage" 
                                        ref={refhook} 
                                        onChange={
                                            (e) => setEditImage(e.target.files[0])
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <input className="button" type="submit" value="Update" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTechStack;