import React, { useState } from 'react'

import { ref as reference, update } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../../firebase.config';

import {toast } from 'react-toastify';

const EditService = ({editPopup, setEditPopup, currentEditItem, setCurrentEditItem, setLoader, serviceData, setServiceData }) => {
    const [editImage, setEditImage] = useState("");
    const refhook = React.useRef();

    const handleServiceEditFormSubmit = async(event)=>{
        event.preventDefault();
        setLoader(true);
        
        let imageUrl = ""
        if (editImage !== ""){
            const storageRef = ref(storage, 'portfolio/images/' + editImage.name);
            uploadBytes(storageRef, editImage)
            .catch(() =>{
                toast.error("Error Occured during image uploading");
            })
            .then(() => {
                // fetching url of the uploaded storage image
                getDownloadURL(ref(storage, 'portfolio/images/' + editImage.name))
                .catch(() => { 
                    setLoader(false);
                    toast.error("Error occured during url handling!..");
                })
                .then((url) => {
                    imageUrl = url
                    update(reference(db, 'portfolio/services/' + currentEditItem.serviceKey), {
                        serviceTitle: currentEditItem.serviceTitle,
                        serviceDetail: currentEditItem.serviceDetail,
                        serviceImageFont: currentEditItem.serviceImageFont,
                        serviceImageUrl: url,
                    })
                    .then(() => {
                        // update the serviceData
                        const updatedService = serviceData.map((service) => {
                            if (service.serviceKey === currentEditItem.serviceKey){
                                service.serviceImageUrl = imageUrl
                                service.serviceTitle = currentEditItem.serviceTitle
                                service.serviceDetail = currentEditItem.serviceDetail
                                service.serviceImageFont = currentEditItem.serviceImageFont 
                            }
                            return service
                        });
                        setServiceData(updatedService);
                        setEditPopup(!editPopup);
                        setLoader(false);
                        // close the loader
                        toast.success("Service updated 😎");
                    })
                    .catch(() => {
                        toast.error("Unable to update, try again later 😒");
                    });    
                })
            })
        }
        else {
            update(reference(db, 'portfolio/services/' + currentEditItem.serviceKey), {
                serviceTitle: currentEditItem.serviceTitle,
                serviceDetail: currentEditItem.serviceDetail,
                serviceImageFont: currentEditItem.serviceImageFont,
            })
            .then(() => {
                // update the serviceData
                const updatedService = serviceData.map((service) =>
                    service.serviceKey === currentEditItem.serviceKey ? currentEditItem : service
                );
                setLoader(false);
                setEditPopup(!editPopup);
                setServiceData(updatedService);
                toast.success("Service updated 😎");
            })
            .catch(() => {
                toast.error("Unable to update, try again later 😒");
            });
        }
    }
    return (
        <div className="edit-content" style={{display:editPopup ? "flex" : "none"}}>
            <div onClick={()=>setEditPopup(!editPopup)} className="cross">
                <i className="fa fa-times" aria-hidden="true"></i>
            </div>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>Update Service</h2>
                    </div>
                    <div className="row">
                        <form onSubmit={handleServiceEditFormSubmit}>
                            <div className="form-row">
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                    <input type="text" name=""
                                        value={currentEditItem.serviceTitle} 
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem,
                                                serviceTitle: e.target.value 
                                            })
                                        } 
                                        required 
                                        placeholder="Service Title" 
                                    />
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                    <input type="text" name=""
                                        value={currentEditItem.serviceImageFont}
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem, 
                                                serviceImageFont: e.target.value 
                                                }
                                            )} 
                                        required
                                        placeholder="Service Icon Font" 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input_field textarea_field"> <span><i aria-hidden="true" className="fa fa-book"></i></span>
                                    <textarea name="detail" rows="3" 
                                        value={currentEditItem.serviceDetail} 
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem, 
                                                serviceDetail: e.target.value 
                                            })
                                        } 
                                        placeholder="Service Detail"
                                        required
                                    />
                                </div>
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

export default EditService;
