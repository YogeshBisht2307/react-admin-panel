import React from 'react';

import { ref as reference, update } from "firebase/database";
import { db } from '../../../firebase.config';

import { toast } from 'react-toastify';

const EditService = ({editPopup, setEditPopup, currentEditItem, setCurrentEditItem, setLoader, setServiceData }) => {
    const handleServiceEditFormSubmit = async(event)=>{
        event.preventDefault();
        setLoader(true);
        setServiceData([]); 
        update(reference(db, 'portfolio/services/' + currentEditItem.serviceKey), {
            serviceTitle: currentEditItem.serviceTitle,
            serviceDetail: currentEditItem.serviceDetail,
            serviceImageFont: currentEditItem.serviceImageFont,
        })
        .then(() => {
            setLoader(false);
            setEditPopup(!editPopup);
            toast.success("Service updated 😎");
        })
        .catch(() => {
            setLoader(false);
            setEditPopup(!editPopup);
            toast.error("Unable to update, try again later 😒");
        });
    }

    return (
        <div className="edit-content services" style={{display:editPopup ? "flex" : "none"}}>
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
