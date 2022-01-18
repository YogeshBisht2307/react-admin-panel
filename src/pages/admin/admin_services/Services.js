import React,{ useState, useEffect } from 'react';

import { ref as reference, push, onValue } from "firebase/database";
import { db } from '../../../firebase.config';

import { toast } from 'react-toastify';
import DisplayServices from './DisplayServices';

import ScreenLoader from '../../../components/utility/Loader';
import './services.css';

const AdminServices = () => {
    const initialState = {
        'serviceTitle': "",
        'serviceDetail': "",
        'serviceImageFont': "",
    }
    const [addRowCollapsible, setAddRowCollapsible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [serviceDataItem, setServiceDataItem] = useState(initialState);

    const [serviceData, setServiceData] = useState([]);
    
    const fetchData = async() => {
        setLoader(true);
        
        const serviceRef = reference(db, 'portfolio/services');
        onValue(serviceRef, (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                let data = childSnapshot.val();
                if (data.deleted === false){
                    setServiceData(arr => 
                        [...arr, {
                            serviceKey: childSnapshot.key,
                            serviceId : data.serviceId,
                            serviceTitle: data.serviceTitle,
                            serviceDetail: data.serviceDetail,
                            serviceImageFont: data.serviceImageFont,
                        }]
                    )
                }
            });
            setLoader(false);
        });
    }

    const validateData = (dataItem) => {
        if (dataItem.serviceTitle.trim() === ""){
            toast.error("Invalid Service Title !");
            return false;
        }
        if (dataItem.serviceDetail.trim() === ""){
            toast.error("Invalid Service Detail !");
            return false;
        }
        return true;
    }

    const submitData = async(e) => {
        e.preventDefault();
        if (validateData(serviceDataItem) === false){
            return;
        }
        setLoader(true);
        setServiceData([]);
        // adding service data to firebase server
        push(reference(db, 'portfolio/services/',), {
            serviceId : `service-${Date.now()}`,
            serviceTitle: serviceDataItem.serviceTitle,
            serviceDetail: serviceDataItem.serviceDetail,
            serviceImageFont: serviceDataItem.serviceImageFont,
            deleted : false,
        }).catch(() => {
            setLoader(false);
            toast.error("Error occured during service data uploading!...");
        })
        .then(() =>{
            setAddRowCollapsible(!addRowCollapsible);
            setServiceDataItem(initialState);
            setLoader(false);
            toast.success("Hurray !!! Service added successfully !");
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
                        <p>Services List</p>
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
                                    <h2>Add New Service</h2>
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
                                                    value={serviceDataItem.serviceTitle} 
                                                    onChange={
                                                        (e)=> setServiceDataItem({
                                                            ...serviceDataItem,
                                                            serviceTitle: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="input_field"> 
                                                <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                                <input type="text" 
                                                    name="image" 
                                                    placeholder="Image font url" 
                                                    value={serviceDataItem.serviceImageFont} 
                                                    onChange={
                                                        (e) => setServiceDataItem({
                                                            ...serviceDataItem,
                                                            serviceImageFont: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="input_field textarea_field"> 
                                                <span><i aria-hidden="true" className="fa fa-book"></i></span>
                                                <textarea rows="3"
                                                    name="detail"
                                                    placeholder="Service Detail" 
                                                    value={serviceDataItem.serviceDetail} 
                                                    onChange={
                                                        (e) => setServiceDataItem({
                                                            ...serviceDataItem,
                                                            serviceDetail: e.target.value
                                                        })
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

                <DisplayServices
                    loader ={loader}
                    setLoader = {setLoader}
                    serviceData={serviceData} 
                    setServiceData={setServiceData} 
                />
                 
            </div>
        </div> 
    )
}

export default AdminServices;
