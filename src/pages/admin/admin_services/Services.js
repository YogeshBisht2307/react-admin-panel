import React,{ useState, useEffect } from 'react'

import { ref as reference, push, onValue } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage,db } from '../../../firebase.config';

import { ToastContainer, toast } from 'react-toastify';

import DisplayTable from './DisplayTable';
import ScreenLoader from '../../../components/utility/Loader';
import './services.css';

const AdminServices = () => {
    const [addRowCollapsible, setAddRowCollapsible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [serviceImageFont, setServiceImageFont] = useState("");
    const [serviceTitle, setServiceTitle] = useState("");
    const [serviceDetail, setServiceDetail] = useState("");
    const [image, setImage] = useState("");

    const [serviceData, setServiceData] = useState([]);

    const refhook = React.useRef();
    
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
                            serviceImageUrl: data.serviceImageUrl,
                            serviceImageFont: data.serviceImageFont,
                        }]
                    )
                }
            });
            setLoader(false);
        });
    }

    const submitData = async(e) => {
        e.preventDefault();

        setLoader(!loader);
        setServiceData([]);

        const storageRef = ref(storage, 'portfolio/images/' + image.name);
        uploadBytes(storageRef, image)
        .catch(error =>{
            console.log(error);
            toast.error("Error Occured during image uploading");
        })
        .then(() => {
            // fetching url of the uploaded storage image
            getDownloadURL(ref(storage, 'portfolio/images/' + image.name))
            .catch(error => { 
                console.log(error);
                setLoader(!loader);
                toast.error("Error occured during url handling!..");
            })
            .then((url) => {
                // adding service data to firebase server
                push(reference(db, 'portfolio/services/',), {
                    serviceId : `service-${Date.now()}`,
                    serviceTitle: serviceTitle,
                    serviceDetail: serviceDetail,
                    serviceImageUrl: url,
                    serviceImageFont: serviceImageFont,
                    deleted : false,
                });
            }).catch(error => {
                console.log(error);
                setLoader(!loader);
                toast.error("Error occured during service data uploading!...");
            })
            .then(() =>{
                setServiceDetail("");
                setServiceImageFont("");
                setServiceTitle("");
                setImage("");
                refhook.current.value = "";
                setLoader(!loader);
                toast.success("Hurray !!! Service added successfully !");
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
        <>
        <ToastContainer/>
        <div className="container">
        {/* adding element */}
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
                                                value={serviceTitle} 
                                                onChange={
                                                    (e)=> setServiceTitle(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="input_field"> 
                                            <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                            <input type="text" 
                                                name="image" 
                                                placeholder="Image font url" 
                                                value={serviceImageFont} 
                                                onChange={
                                                    (e) => setServiceImageFont(e.target.value)
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
                                                value={serviceDetail} 
                                                onChange={
                                                    (e) => setServiceDetail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="input_field textarea_field">
                                            <input type="file"
                                                name="image"
                                                ref={refhook} 
                                                onChange={
                                                    (e) => setImage(e.target.files[0])
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
            <DisplayTable
                loader ={loader}
                setLoader = {setLoader}
                serviceData={serviceData} 
                setServiceData={setServiceData} 
            />  
        </div>
    </div> 
    </>
    )
}

export default AdminServices;
