import React, {useState} from 'react'

import { ref as reference, push } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage,db } from '../../../firebase.config';

import ScreenLoader from '../../../components/utility/Loader';

import { toast } from 'react-toastify';

import '../admin.css';

const TechStack = () => {
    const [addRowCollapsible, setAddRowCollapsible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [techStackTitle, setTechStackTitle] = useState("");
    const [techStackImage, setTechStackImage] = useState("");
    const [techStackCategory, setTechStackCategory] = useState("");
    const [techStackData, setTechStackData] = useState([]);
    
    const refhook = React.useRef();

    const submitData = async(e) => {
        e.preventDefault();

        setLoader(!loader);

        const storageRef = ref(storage, 'images/tech_stacks/' + techStackImage.name);
        uploadBytes(storageRef, techStackImage)
        .catch(() =>{
            toast.error("Error Occured during image uploading");
        })
        .then(() => {
            // fetching url of the uploaded storage image
            getDownloadURL(ref(storage,  'images/tech_stacks/' + techStackImage.name))
            .catch(error => { 
                console.log(error);
                setLoader(false);
                toast.error("Error occured during url handling!..");
            })
            .then((url) => {
                console.log(url);
                // adding tech_stack data to firebase server
                push(reference(db, 'portfolio/tech_stacks/',), {
                    tech_stackId : `tech_stack-${Date.now()}`,
                    tech_stackTitle: techStackTitle,
                    tech_stackCategory: techStackCategory,
                    tech_stackImageUrl :  url,
                    deleted : false,
                })
            }).catch((error) => {
                console.log(error);
                setLoader(false);
                toast.error("Error occured during tech stack data uploading!...");
            })
            .then(() =>{
                setTechStackCategory("");
                setTechStackImage("");
                setTechStackTitle("");
                setLoader(false);
                setAddRowCollapsible(!addRowCollapsible);
                toast.success("Hurray !!! tech_stack added successfully !");
            })
        })
    }

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
                    <p>Tech Stack List</p>
                    <button 
                        className="collapsible"
                        onClick={
                        () => setAddRowCollapsible(!addRowCollapsible)
                        } 
                    >
                        Add Service
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
                                <h2>Add Tech Stack</h2>
                            </div>
                            <div className="row">
                            {/* Add services form starts here */}
                                <form onSubmit={submitData}>
                                    <div className="form-row">
                                        <div className="input_field"> 
                                            <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                            <input type="text" 
                                                name="title" 
                                                placeholder="Title" 
                                                value={techStackTitle} 
                                                onChange={
                                                    (e)=> setTechStackTitle(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="input_field"> 
                                            <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                            <input type="text" 
                                                name="image" 
                                                placeholder="Category" 
                                                value={techStackCategory} 
                                                onChange={
                                                    (e) => setTechStackCategory(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="input_field textarea_field">
                                            <input type="file"
                                                name="image"
                                                ref={refhook} 
                                                onChange={
                                                    (e) => setTechStackImage(e.target.files[0])
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <input className="button" type="submit" value="Add Service" />
                                    </div>
                                </form>
                                {/* Add services form ends here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    )
}

export default TechStack;
