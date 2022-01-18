import React, { useState } from 'react';

import { ref as reference, update } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../../firebase.config';

import { toast } from 'react-toastify';

const EditProject = ({ editPopup, setEditPopup, currentEditItem, setCurrentEditItem, setLoader,setProjectsData }) => {
    const [editImage, setEditImage] = useState("");
    const refhook = React.useRef();

    const validateEditData = (editItem) => {
        if (editItem.projectTitle === ""){
            toast.error("Invalid Title !");
            return false;
        }
        if (editItem.projectDate === ""){
            toast.error("Invalid Date !");
            return false;
        }
        if (editItem.projectLink === ""){
            toast.error("Invalid Link !");
            return false;
        }
        if (editItem.projectTechTitle === ""){
            toast.error("Inavlid Tech Stack !")
            return false;
        }
        if (editItem.projectDetail === ""){
            toast.error("Invalid Detail !");
            return false;
        }
        return true;
    }


    const handleprojectEditFormSubmit = async(event)=>{
        event.preventDefault();
        setProjectsData([]);
        
        if (validateEditData(currentEditItem) !== true){
            return;
        }
        setLoader(true);
        
        if (editImage !== ""){
            const storageRef = ref(storage, 'images/projects/' + editImage.name);
            uploadBytes(storageRef, editImage)
            .catch(() =>{
                toast.error("Error Occured during image uploading");
            })
            .then(() => {
                // fetching url of the uploaded storage image
                getDownloadURL(ref(storage, 'images/projects/' + editImage.name))
                .catch(() => { 
                    setLoader(false);
                    toast.error("Error occured during url handling!..");
                })
                .then((url) => {
                    update(reference(db, 'portfolio/projects/' + currentEditItem.projectKey), {
                        projectTitle: currentEditItem.projectTitle,
                        projectDate: currentEditItem.projectDate,
                        projectLink: currentEditItem.projectLink,
                        projectTechTitle: currentEditItem.projectTechTitle,
                        projectDetail: currentEditItem.projectDetail,
                        projectImageUrl: url,
                    })
                    .then(() => {
                        setEditPopup(!editPopup);
                        setLoader(false);
                        toast.success("project updated 😎");
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error("Unable to update, try again later 😒");
                    });    
                })
            })
        }
        else {
            update(reference(db, 'portfolio/projects/' + currentEditItem.projectKey), {
                projectTitle: currentEditItem.projectTitle,
                projectDate: currentEditItem.projectDate,
                projectLink: currentEditItem.projectLink,
                projectTechTitle: currentEditItem.projectTechTitle,
                projectDetail: currentEditItem.projectDetail,
            })
            .then(() => {
                // update the projectData
                setLoader(false);
                setEditPopup(!editPopup);
                toast.success("project updated 😎");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Unable to update, try again later 😒");
            });
        }
    }
    return (
        <div className="edit-content project" style={{display:editPopup ? "flex" : "none"}}>
            <div onClick={()=>setEditPopup(!editPopup)} className="cross">
                <i className="fa fa-times" aria-hidden="true"></i>
            </div>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <h2>Update project</h2>
                    </div>
                    <div className="row">
                        <form onSubmit={handleprojectEditFormSubmit}>
                            <div className="form-row">
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                    <input type="text" name=""
                                        value={currentEditItem.projectTitle} 
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem,
                                                projectTitle: e.target.value 
                                            })
                                        }  
                                        placeholder="project Title" 
                                    />
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                    <input type="text" name=""
                                        value={currentEditItem.projectDate}
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem, 
                                                projectDate: e.target.value 
                                                }
                                            )} 
                                        placeholder="project Date" 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                    <input type="text" name=""
                                        value={currentEditItem.projectTechTitle} 
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem,
                                                projectTechTitle: e.target.value 
                                            })
                                        } 
                                        placeholder="project Tech Stack" 
                                    />
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                    <input type="text" name=""
                                        value={currentEditItem.projectLink}
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem, 
                                                projectLink: e.target.value 
                                                }
                                            )} 
                                        placeholder="project Link" 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input_field textarea_field"> <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                    <textarea name="detail" rows="3" 
                                        value={currentEditItem.projectDetail} 
                                        onChange={
                                            (e) => setCurrentEditItem({ 
                                                ...currentEditItem, 
                                                projectDetail: e.target.value 
                                            })
                                        } 
                                        placeholder="project Detail"
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

export default EditProject;
