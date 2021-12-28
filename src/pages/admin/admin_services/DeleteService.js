import React from 'react'

import { ref as reference, update, remove } from "firebase/database";
import { db } from '../../../firebase.config';

import {toast } from 'react-toastify';

const DeleteService = ({delPopup, setDelPopup, currentDelItem, setLoader, serviceData, setServiceData}) => {
    const handleSoftDelete = () => {
        setLoader(true);
        update(reference(db, 'portfolio/services/' + currentDelItem.serviceKey), {
            deleted : true
        }).catch((error) => {
            console.log(error);
            setLoader(false);
            toast.error("Unable to delete, try again later 😒");
        }).then(() => {
            setServiceData(serviceData.filter(item => item.serviceKey !== currentDelItem.serviceKey));
            toast.success("Service deleted 😎");
            setLoader(false);
            setDelPopup(!delPopup);
        })
    }

    const handlePermanentDelete = () => {
        let useRefer = reference(db, 'portfolio/services/' + currentDelItem.serviceKey)
        remove(useRefer).catch((error) => {
            console.log(error);
            toast.error("unable to make permanent delete!");
            setLoader(false);
            setDelPopup(!delPopup);

        }).then(() => {
            setLoader(false);
            setServiceData(serviceData.filter(item => item.serviceKey !== currentDelItem.serviceKey));
            toast.success("Service deleted 😎");
            setDelPopup(!delPopup);

        })
    }
    return (
        <div className="delete_container" style={{display : delPopup ? "flex": "none"}}>
            <div className="box">
                <div onClick={() => setDelPopup(!delPopup)} className="cross">
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
                <h3>Delete Service?</h3>
                <p>Are you sure you want to delete</p>
                
                <div className="warn_info">
                    <h4><i className="fa fa-warning"></i> Warning</h4>
                    <p>By deleting service ({currentDelItem.serviceTitle}) you can't undo this action.</p>
                </div>
                
                <div className="clearfix">
                    <button className="btn1" id="softdelete"  onClick={handleSoftDelete}>Soft Delete</button>
                    <button className="btn2" id="permanent_delete" onClick={handlePermanentDelete}>Permanent Delete<i className="fa fa-trash"></i
                    ></button>
                </div>
            </div>
        </div>
    )
}

export default DeleteService;
