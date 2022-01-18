import React from 'react';

import { ref as reference, update, remove } from "firebase/database";
import { db } from '../../../firebase.config';

import { toast } from 'react-toastify';

const DeleteProject = ({delPopup, setDelPopup, currentDelItem, setLoader, setProjectsData}) => {
    const handleSoftDelete = () => {
        setProjectsData([]);
        setLoader(true);
        update(reference(db, 'portfolio/projects/' + currentDelItem.projectKey), {
            deleted : true
        }).catch((error) => {
            console.log(error);
            setLoader(false);
            toast.error("Unable to delete, try again later 😒");
        }).then(() => {
            toast.success("Project deleted 😎");
            setLoader(false);
            setDelPopup(!delPopup);
        })
    }

    const handlePermanentDelete = () => {
        setProjectsData([]);
        let useRefer = reference(db, 'portfolio/projects/' + currentDelItem.projectKey);
        remove(useRefer).catch((error) => {
            console.log(error);
            toast.error("unable to make permanent delete!");
            setLoader(false);
            setDelPopup(!delPopup);

        }).then(() => {
            setLoader(false);
            toast.success("Project deleted 😎");
            setDelPopup(!delPopup);
        })
    }
    return (
        <div className="delete_container" style={{display : delPopup ? "flex" : "none"}}>
            <div className="box">
                <div onClick={() => setDelPopup(!delPopup)} className="cross">
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
                <h3>Delete Project?</h3>
                <p>Are you sure you want to delete</p>
                
                <div className="warn_info">
                    <h4><i className="fa fa-warning"></i> Warning</h4>
                    <p>By deleting Project ({currentDelItem.projectTitle}) you can't undo this action.</p>
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

export default DeleteProject;
