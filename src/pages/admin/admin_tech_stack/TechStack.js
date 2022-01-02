import React, {useState, useEffect} from 'react'

import { ref as reference, push, onValue } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage,db } from '../../../firebase.config';

import ScreenLoader from '../../../components/utility/Loader';

import { toast } from 'react-toastify';
import DisplayTechStack from './DisplayTechStack';
import './techStack.css';

const TechStack = () => {
    const [addRowCollapsible, setAddRowCollapsible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [techStackTitle, setTechStackTitle] = useState("");
    const [techStackImage, setTechStackImage] = useState("");
    const [techStackCategory, setTechStackCategory] = useState("");
    const [techStackData, setTechStackData] = useState([]);
    
    const refhook = React.useRef();

    const validatetechStackData = () => {
        if (techStackTitle === ""){
            toast.error("Invalid Tech Stack Title !");
            return false;
        }
        if (techStackCategory === ""){
            toast.error("Invalid Tech Stack Category !");
            return false;
        }
        if (techStackImage === ""){
            toast.error("Invalid Tech Stack Image !");
            return false;
        }

        return true;
    }

    const fetchData = async() => {
        setLoader(true);
        setTechStackData([]);

        const techStackRef = reference(db, 'portfolio/tech_stacks/');
        onValue(techStackRef, (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                let data = childSnapshot.val();
                if (data.deleted === false){
                    setTechStackData(arr => 
                        [...arr, {
                            tech_stackKey: childSnapshot.key,
                            tech_stackId : data.tech_stackId,
                            tech_stackTitle: data.tech_stackTitle,
                            tech_stackCategory: data.tech_stackCategory,
                            tech_stackImageUrl: data.tech_stackImageUrl,
                            deleted : data.deleted
                        }]
                    )
                }
            });
            setLoader(false);
        });
    }

    const submitData = async(e) => {
        e.preventDefault();
        if ( validatetechStackData() === false ){
            return;
        }

        setTechStackData([]);
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
                    <p>Tech Stack List</p>
                    <button 
                        className="collapsible"
                        onClick={
                        () => setAddRowCollapsible(!addRowCollapsible)
                        } 
                    >
                        Add TechStack
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
                            {/* Add tech stack form starts here */}
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
                                        <input className="button" type="submit" value="Add TechStack" />
                                    </div>
                                </form>
                                {/* Add tech stack form ends here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DisplayTechStack
                loader ={loader}
                setLoader = {setLoader}
                techStackData={techStackData} 
                setTechStackData={setTechStackData} 
            />

        </div>
    </div> 
    )
}

export default TechStack;
