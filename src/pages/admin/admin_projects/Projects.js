import React,{ useState, useEffect } from 'react';

import { ref as reference, push, onValue } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage,db } from '../../../firebase.config';

import { toast } from 'react-toastify';

import ScreenLoader from '../../../components/utility/Loader';
import DisplayProjects from './DisplayProjects';
import './project.css';

const AdminProjects = () => {
    const projectDataInitialState = {
        'projectTitle' : "",
        'projectDate' : "",
        'projectDetail' : "",
        'projectLink' : "",
        'projectTechTitle' : "",
        'projectImageUrl' : "",
        'deleted' : false,
    };
    const [addRowCollapsible, setAddRowCollapsible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [projectData, setProjectData] = useState(projectDataInitialState)
    const [projectImage, setProjectImage] = useState("");
    const [projectsData, setProjectsData] = useState([]);

    const refhook = React.useRef();

    const validateProjectData = (projectData, projectImage) => {
        if (projectData.projectTitle === ""){
            toast.error("Invalid Project Title !");
            return false;
        }
        if (projectData.projectDate === ""){
            toast.error("Invalid Project Date !");
            return false;
        }
        if (projectData.projectLink === ""){
            toast.error("Invalid Project Link !");
            return false;
        }
        if (projectData.projectTechTitle === ""){
            toast.error("Invalid Project Tech Title !");
            return false;
        }
        if (projectData.projectDetail === ""){
            toast.error("Invalid Project Detail !");
            return false;
        }
        if (projectImage === ""){
            toast.error("Invalid Porject Image !");
            return false;
        }

        return true;
    }
    
    const fetchData = () => {
        setLoader(true);
        
        const projectRef = reference(db, 'portfolio/projects');
        onValue(projectRef, (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                let data = childSnapshot.val();
                if (data.deleted === false){
                    setProjectsData(arr => 
                        [...arr, {
                            projectKey: childSnapshot.key,
                            projectId : data.projectId,
                            projectTitle: data.projectTitle,
                            projectDate: data.projectDate,
                            projectDetail: data.projectDetail,
                            projectLink: data.projectLink,
                            projectTechTitle: data.projectTechTitle,
                            projectImageUrl: data.projectImageUrl,
                        }]
                    )
                }
            });
            setLoader(false);
        });
    }

    const submitData = (e) => {
        e.preventDefault();
        if ( validateProjectData(projectData, projectImage) === false ){
            return;
        }

        setLoader(true);
        setProjectsData([]);

        const storageRef = ref(storage, 'images/projects/' + projectImage.name);
        uploadBytes(storageRef, projectImage)
        .catch(() =>{
            toast.error("Error Occured during image uploading");
        })
        .then(() => {
            // fetching url of the uploaded storage image
            getDownloadURL(ref(storage,  'images/projects/' + projectImage.name))
            .catch(error => { 
                console.log(error);
                setLoader(false);
                toast.error("Error occured during url handling!..");
            })
            .then((url) => {
                // adding project data to firebase server
                push(reference(db, 'portfolio/projects/',), {
                    projectId : `project-${Date.now()}`,
                    projectTitle : projectData.projectTitle,
                    projectDate : projectData.projectDate,
                    projectDetail : projectData.projectDetail,
                    projectLink : projectData.projectLink,
                    projectTechTitle : projectData.projectTechTitle,
                    projectImageUrl :  url,
                    deleted : projectData.deleted,
                })
            }).catch((error) => {
                console.log(error);
                setLoader(false);
                toast.error("Error occured during project data uploading!...");
            })
            .then(() =>{
                setProjectData(projectDataInitialState);
                setProjectImage("");
                setLoader(false);
                setAddRowCollapsible(!addRowCollapsible);
                toast.success("Hurray !!! Project added successfully !");
            })
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (loader){
        return (
            <ScreenLoader/>
        )
    }
    return (
        <div className="container">
            <div className="main">
                <div className="addElement">
                    <div className="addElementHeader">
                        <p>Projects List</p>
                        <button 
                            className="collapsible"
                            onClick={
                            () => setAddRowCollapsible(!addRowCollapsible)
                            } 
                        >
                            Add Project
                        </button>
                    </div>
                    <div className="content" 
                        style = {{
                                display: addRowCollapsible 
                                ? "flex" : "none"
                            }}
                        >
                        <div className="form_wrapper">
                            <div className="form_container">
                                <div className="title_container">
                                    <h2>Add New Project</h2>
                                </div>
                                <div className="row">
                                {/* Add projects form starts here */}
                                    <form onSubmit={submitData}>
                                        <div className="form-row">
                                            <div className="input_field"> 
                                                <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                                <input type="text" 
                                                    name="title" 
                                                    placeholder="Project Title" 
                                                    value={projectData.projectTitle} 
                                                    onChange={
                                                        (e)=> setProjectData({ 
                                                            ...projectData,
                                                            projectTitle: e.target.value 
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="input_field"> 
                                                <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                                <input type="text" 
                                                    name="image" 
                                                    placeholder="Project Done Date" 
                                                    value={projectData.projectDate} 
                                                    onChange={
                                                        (e) => setProjectData({ 
                                                            ...projectData,
                                                            projectDate: e.target.value 
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="input_field"> 
                                                <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                                <input type="text" 
                                                    name="title" 
                                                    placeholder="Project Link" 
                                                    value={projectData.projectLink} 
                                                    onChange={
                                                        (e)=> setProjectData({ 
                                                            ...projectData, 
                                                            projectLink: e.target.value 
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="input_field"> 
                                                <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                                <input type="text" 
                                                    name="image" 
                                                    placeholder="Project Technology Stack" 
                                                    value={projectData.projectTechTitle} 
                                                    onChange={
                                                        (e) => setProjectData({
                                                            ...projectData,
                                                            projectTechTitle: e.target.value 
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="input_field textarea_field"> 
                                                <span><i aria-hidden="true" className="fa fa-hand-peace-o"></i></span>
                                                <textarea rows="3"
                                                    name="detail"
                                                    placeholder="Project Detail" 
                                                    value={projectData.projectDetail} 
                                                    onChange={
                                                        (e) => setProjectData({
                                                            ...projectData,
                                                            projectDetail: e.target.value 
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="input_field textarea_field">
                                                <input type="file"
                                                    name="image"
                                                    ref={refhook} 
                                                    onChange={
                                                        (e) => setProjectImage(e.target.files[0])
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <input className="button" type="submit" value="Add Project" />
                                        </div>
                                    </form>
                                    {/* Add Projects form ends here */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DisplayProjects
                    loader ={loader}
                    setLoader = {setLoader}
                    projectsData={projectsData} 
                    setProjectsData={setProjectsData} 
                />

            </div>
        </div> 
    )
}

export default AdminProjects;
