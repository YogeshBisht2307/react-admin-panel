import React, { useState } from 'react'

import { ref as reference, update } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../../firebase.config';

import {toast } from 'react-toastify';

const DisplayTable = ({setLoader, serviceData, setServiceData, editWindow, setEditWindow}) => {
    const [currentService, setCurrentService] = useState({});
    const [editImage, setEditImage] = useState("");
    const [editImageUrl, setEditImageUrl] = useState("");

    const refhook = React.useRef();

    const editService = (service) => {
        setEditWindow(!editWindow);
        setCurrentService(service);
    }

    const handleServiceEditFormSubmit = (event)=>{
        setLoader(true);
        event.preventDefault();
        
        //  TODO implimentation of image update
        // let updated_image_url = "hello"
        if (editImage !== ""){
            const storageRef = ref(storage, 'portfolio/images/' + editImage.name);
            uploadBytes(storageRef, editImage)
            .catch(error =>{
                console.log(error);
                toast.error("Error Occured during image uploading");
            })
            .then(() => {
                // fetching url of the uploaded storage image
                getDownloadURL(ref(storage, 'portfolio/images/' + editImage.name))
                .catch(error => { 
                    console.log(error);
                    setLoader(false);
                    toast.error("Error occured during url handling!..");
                })
                .then((url) => {
                    setEditImageUrl(url);
                    update(reference(db, 'portfolio/services/' + currentService.serviceKey), {
                        serviceTitle: currentService.serviceTitle,
                        serviceDetail: currentService.serviceDetail,
                        serviceImageFont: currentService.serviceImageFont,
                        serviceImageUrl: url,
                    })
                    .then(() => {
                        // close editing window
                        setEditWindow(!editWindow);
                        // update the serviceData
                        const updatedService = serviceData.map((service) =>
                            service.serviceKey === currentService.serviceKey ? currentService : service
                        );
                        setServiceData(updatedService);
                        setCurrentService({ 
                            ...currentService,
                            serviceImageUrl:  editImageUrl
                        })
                        // close the loader
                        toast.success("Service updated 😎");
                        refhook.current.value = "";
                        setLoader(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        
                        toast.error("Unable to update, try again later 😒");
                    });    
                }
                )
            })
        }
        else {
            update(reference(db, 'portfolio/services/' + currentService.serviceKey), {
                serviceTitle: currentService.serviceTitle,
                serviceDetail: currentService.serviceDetail,
                serviceImageFont: currentService.serviceImageFont,
            })
            .then(() => {
                // close editing window
                setEditWindow(!editWindow);
                // update the serviceData
                const updatedService = serviceData.map((service) =>
                    service.serviceKey === currentService.serviceKey ? currentService : service
                );
                setServiceData(updatedService);
                // close the loader
                toast.success("Service updated 😎");
                setLoader(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Unable to update, try again later 😒");
            });
        }

        // var object = {
        //     serviceTitle: currentService.serviceTitle,
        //     serviceDetail: currentService.serviceDetail,
        //     serviceImageFont: currentService.serviceImageFont,
        //     // todo for image upload
        //     // serviceImageUrl: image_url !== null && updated_image_url
        //   }
        
    }
    return (
        <div className="content-table" style={{overflowX : 'auto'}}>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Detail</th>
                    <th>Image Font</th>
                    <th>Image Url</th>
                    <th colSpan="2">Action</th>
                </tr>
                </thead>
                <tbody>
                    {/* first row */}
                    {serviceData.map((service, index) => {
                        return (
                            <tr key={index}>
                                <td data-title='service_title'>{service.serviceTitle}</td>
                                <td data-title='service_detail'>{service.serviceDetail}</td>
                                <td data-title='service_image_font'>{service.serviceImageFont}</td>
                                <td data-title='service_image_url'>{service.serviceImageUrl}</td>
                                <td className='edit'>
                                    <button className='button' id="{serviceId}" onClick={()=> editService(service)}>Edit</button>
                                </td>
                                <td className='delete'>
                                    <button id="{serviceId}" className='button'>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            {/* table footer */}
                <tfoot>
                    <tr>
                    <th colSpan='5'>Year: 2021</th>
                    </tr>
                </tfoot>
            </table>
            {/* edit editWindow  */}
            <div className="edit-content" style={{display:editWindow ? "flex" : "none"}}>
                <div onClick={()=>setEditWindow(!editWindow)} className="cross">
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
                <div className="form_wrapper">
                    <div className="form_container">
                        <div className="title_container">
                            <h2>Update Service</h2>
                        </div>
                        <div className="row">
                            <form onSubmit={handleServiceEditFormSubmit}>
                                <div className="form-row">
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                        <input type="text" name=""
                                            value={currentService.serviceTitle} 
                                            onChange={
                                                (e) => setCurrentService({ 
                                                    ...currentService,
                                                    serviceTitle: e.target.value 
                                                })
                                            } 
                                            required 
                                            placeholder="Service Title" 
                                        />
                                    </div>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                        <input type="text" name=""
                                            value={currentService.serviceImageFont}
                                            onChange={
                                                (e) => setCurrentService({ 
                                                    ...currentService, 
                                                    serviceImageFont: e.target.value 
                                                    }
                                                )} 
                                            required
                                            placeholder="Service Icon Font" 
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input_field textarea_field"> <span><i aria-hidden="true" className="fa fa-book"></i></span>
                                        <textarea name="detail" rows="3" 
                                            value={currentService.serviceDetail} 
                                            onChange={
                                                (e) => setCurrentService({ 
                                                    ...currentService, 
                                                    serviceDetail: e.target.value 
                                                })
                                            } 
                                            placeholder="Service Detail"
                                            required
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
        </div>
    )
}

export default DisplayTable
