import React from 'react'

import { ref as reference, update, remove } from "firebase/database";
import { db } from '../../../firebase.config';

import {toast } from 'react-toastify';

const DeleteContact = ({delPopup, setDelPopup, currentDelItem, setLoader, contactList, setContactList}) => {
    const handleSoftDelete = () => {
        setLoader(true);
        update(reference(db, 'portfolio/contact_mails/' + currentDelItem.contactKey), {
            deleted : true
        }).catch((error) => {
            console.log(error);
            setLoader(false);
            toast.error("Unable to delete, try again later 😒");
        }).then(() => {
            setContactList(contactList.filter(item => item.contactKey !== currentDelItem.contactKey));
            setLoader(false);
            setDelPopup(!delPopup);
            toast.success("Contact deleted 😎");
        })
    }

    const handlePermanentDelete = () => {
        let useRefer = reference(db, 'portfolio/contact_mails/' + currentDelItem.contactKey)
        remove(useRefer).catch((error) => {
            console.log(error);
            toast.error("unable to make permanent delete!");
            setLoader(false);
            setDelPopup(!delPopup);

        }).then(() => {
            setLoader(false);
            setContactList(contactList.filter(item => item.contactKey !== currentDelItem.contactKey));
            toast.success("Contact deleted 😎");
            setDelPopup(!delPopup);

        })
    }
    return (
        <div className="delete_container" style={{display : delPopup ? "flex" : "none"}}>
            <div className="box">
                <div onClick={() => setDelPopup(!delPopup)} className="cross">
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
                <h3>Delete Contact?</h3>
                <p>Are you sure you want to delete</p>
                
                <div className="warn_info">
                    <h4><i className="fa fa-warning"></i> Warning</h4>
                    <p>By deleting contact ({currentDelItem.email}) you can't undo this action.</p>
                </div>
                
                <div className="clearfix">
                    <button className="btn1" id="softdelete"  onClick={handleSoftDelete}>Soft Delete</button>
                    <button className="btn2" id="permanent_delete" onClick={handlePermanentDelete} >Permanent Delete 
                    <i className="fa fa-trash"></i></button>
                </div>
            </div>
        </div>
    )
}

export default DeleteContact;
