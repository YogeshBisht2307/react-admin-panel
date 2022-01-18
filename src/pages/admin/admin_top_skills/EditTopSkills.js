import React from 'react';

import { ref as reference, update } from "firebase/database";
import { db } from '../../../firebase.config';

import { toast } from 'react-toastify';

const EditTopSkill = ({ editPopup, setEditPopup, currentEditItem, setCurrentEditItem, setLoader, setTopSkillsData }) => {
    const validateData = (dataItem) => {
        if (dataItem.top_skillTitle.trim() === ""){
            toast.error("Invalid top_skills Title !");
            return false;
        }
        if (dataItem.top_skillPoint.trim() === ""){
            toast.error("Invalid top_skills Point !");
            return false;
        }
        if (isNaN(dataItem.top_skillPoint) === true){
            toast.error("Top Skill Point is Not a Number !");
            return false;
        }
        if (Number(dataItem.top_skillPoint) > 10 ){
            toast.error("Top Skill Point Can't be greater then 10 !");
            return false;
        }
        if (dataItem.top_skillBgColor.trim() === ""){
            toast.error("Inavalid Background color !")
            return false
        }

        return true;
    }

    const handleEditFormSubmit = (event)=>{
        event.preventDefault();
        if (validateData(currentEditItem) === false){
            return;
        }
        setLoader(true);
        setTopSkillsData([]); 
        update(reference(db, 'portfolio/top_skills/' + currentEditItem.top_skillKey), {
            top_skillTitle: currentEditItem.top_skillTitle,
            top_skillPoint: currentEditItem.top_skillPoint,
            top_skillBgColor: currentEditItem.top_skillBgColor,
        })
        .then(() => {
            setLoader(false);
            setEditPopup(!editPopup);
            toast.success("Top Skill updated 😎");
        })
        .catch(() => {
            setLoader(false);
            setEditPopup(!editPopup);
            toast.error("Unable to update, try again later 😒");
        });
    }

    return (
        <div className="edit-content top_skills" style={{display:editPopup ? "flex" : "none"}}>
            <div onClick={()=>setEditPopup(!editPopup)} className="cross">
                <i className="fa fa-times" aria-hidden="true"></i>
            </div>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>Update Skill</h2>
                    </div>
                    <div className="row">
                        <form onSubmit={handleEditFormSubmit}>
                            <div className="form-row">
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                    <input type="text" name=""
                                        value={currentEditItem.top_skillTitle} 
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem,
                                                top_skillTitle: e.target.value 
                                            })
                                        } 
                                        required 
                                        placeholder="Skill Title" 
                                    />
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                    <input type="text" name=""
                                        value={currentEditItem.top_skillPoint}
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem, 
                                                top_skillPoint: e.target.value 
                                                }
                                            )} 
                                        required
                                        placeholder="Number in between 1-10" 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input_field textarea_field"> <span><i aria-hidden="true" className="fa fa-book"></i></span>
                                    <input type="text" name="bg_color" 
                                        value={currentEditItem.top_skillBgColor} 
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem, 
                                                top_skillBgColor: e.target.value 
                                            })
                                        } 
                                        placeholder="rgb(red, green, blue)"
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

export default EditTopSkill;
