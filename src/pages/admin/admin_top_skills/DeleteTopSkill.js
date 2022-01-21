import React from 'react';

import { ref as reference, update, remove } from "firebase/database";
import { db } from '../../../firebase.config';

import { toast } from 'react-toastify';

const DeleteTopSkill = ({ delPopup, setDelPopup, currentDelItem, setLoader, setTopSkillsData }) => {
    const handleSoftDelete = () => {
        setLoader(true);
        setTopSkillsData([]);
        update(reference(db, 'portfolio/top_skills/' + currentDelItem.top_skillKey), {
            deleted : true
        }).catch(() => {
            setLoader(false);
            toast.error("Unable to delete, try again later 😒");
        }).then(() => {
            setDelPopup(!delPopup);
            setLoader(false);
            toast.success("Skill deleted 😎");
            
        })
    }

    const handlePermanentDelete = () => {
        setLoader(true);
        setTopSkillsData([]);
        let useRefer = reference(db, 'portfolio/top_skills/' + currentDelItem.top_skillKey);
        remove(useRefer).catch(() => {
            setLoader(false);
            setDelPopup(!delPopup);
            toast.error("unable to make permanent delete!");

        }).then(() => {
            setDelPopup(!delPopup);
            setLoader(false);
            toast.success("Top Skill deleted 😎");
        })
    }

    return (
        <div className="delete_container" style={{display : delPopup ? "flex" : "none"}}>
            <div className="box">
                <div onClick={() => setDelPopup(!delPopup)} className="cross">
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
                <h3>Delete Skill?</h3>
                <p>Are you sure you want to delete</p>
                
                <div className="warn_info">
                    <h4><i className="fa fa-warning"></i> Warning</h4>
                    <p>By deleting Skill ({currentDelItem.top_skillTitle}) you can't undo this action.</p>
                </div>
                
                <div className="clearfix">
                    <button className="btn" id="softdelete"  onClick={handleSoftDelete}>Soft Delete</button>
                    <button className="btn" id="permanent_delete" onClick={handlePermanentDelete} >Permanent Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTopSkill;
