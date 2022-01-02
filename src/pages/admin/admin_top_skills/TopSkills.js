import React,{ useState, useEffect } from 'react'

import { ref as reference, push, onValue } from "firebase/database";
import { db } from '../../../firebase.config';

import { toast } from 'react-toastify';
import DisplayTopSkills from './DisplayTopSkills';

import ScreenLoader from '../../../components/utility/Loader';
import './topskills.css';

const AdminTopSkills = () => {
    const initialState = {
        'top_skillTitle': "",
        'top_skillPoint': "",
    }
    const [addRowCollapsible, setAddRowCollapsible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [topSkillDataItem, setTopSkillDataItem] = useState(initialState);

    const [topSkillsData, setTopSkillsData] = useState([]);
    
    const fetchData = async() => {
        setLoader(true);
        
        const top_skillsRef = reference(db, 'portfolio/top_skills');
        onValue(top_skillsRef, (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                let data = childSnapshot.val();
                if (data.deleted === false){
                    setTopSkillsData(arr => 
                        [...arr, {
                            top_skillKey: childSnapshot.key,
                            top_skillId : data.top_skillsId,
                            top_skillTitle: data.top_skillTitle,
                            top_skillPoint: data.top_skillPoint,
                        }]
                    )
                }
            });
            setLoader(false);
        });
    }

    const validateData = (dataItem) => {
        console.log(isNaN(dataItem.top_skillPoint))
        if (dataItem.top_skillTitle.trim() === ""){
            toast.error("Invalid top_skills Title !");
            return false;
        }
        if (dataItem.top_skillPoint.trim() === ""){
            toast.error("Invalid top_skills Point !");
            return false;
        }
        if(isNaN(dataItem.top_skillPoint) === true){
            toast.error("Top Skill Point is Not a Number !");
            return false;
        }

        return true;
    }

    const submitData = async(e) => {
        e.preventDefault();
        if (validateData(topSkillDataItem) === false){
            return;
        }
        setLoader(true);
        setTopSkillsData([]);
        // adding top_skills data to firebase server
        push(reference(db, 'portfolio/top_skills/',), {
            top_skillId : `top_skill-${Date.now()}`,
            top_skillTitle: topSkillDataItem.top_skillTitle,
            top_skillPoint: topSkillDataItem.top_skillPoint,
            deleted : false,
        }).catch(() => {
            setLoader(false);
            toast.error("Error occured during top_skills data uploading!...");
        })
        .then(() =>{
            setAddRowCollapsible(!addRowCollapsible);
            setTopSkillDataItem(initialState);
            setLoader(false);
            toast.success("Hurray !!! top_skills added successfully !");
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
                        <p>Top Skill List</p>
                        <button 
                            className="collapsible"
                            onClick={
                            () => setAddRowCollapsible(!addRowCollapsible)
                            } 
                        >
                            Add Skills
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
                                    <h2>Add New Skills</h2>
                                </div>
                                <div className="row">
                                {/* Add top_skills form starts here */}
                                    <form onSubmit={submitData}>
                                        <div className="form-row">
                                            <div className="input_field"> 
                                                <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                                <input type="text" 
                                                    name="title" 
                                                    placeholder="Title" 
                                                    value={topSkillDataItem.top_skillTitle} 
                                                    onChange={
                                                        (e)=> setTopSkillDataItem({
                                                            ...topSkillDataItem,
                                                            top_skillTitle: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="input_field"> 
                                                <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                                <input type="text" 
                                                    name="image" 
                                                    placeholder="Skill Point" 
                                                    value={topSkillDataItem.top_skillPoint} 
                                                    onChange={
                                                        (e) => setTopSkillDataItem({
                                                            ...topSkillDataItem,
                                                            top_skillPoint: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <input className="button" type="submit" value="Add top_skills" />
                                        </div>
                                    </form>
                                    {/* Add top_skills form ends here */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DisplayTopSkills
                    loader ={loader}
                    setLoader = {setLoader}
                    topSkillsData={topSkillsData} 
                    setTopSkillsData={setTopSkillsData} 
                />
                 
            </div>
        </div> 
    )
}

export default AdminTopSkills;
