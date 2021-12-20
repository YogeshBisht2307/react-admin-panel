import React, { useState } from 'react'


const DisplayTable = ({serviceData, setServiceData, editWindow, setEditWindow}) => {
    const [currentService, setCurrentService] = useState({});
    const editService = (service) => {
        setEditWindow(!editWindow);
        setCurrentService(service);
    }

    const handleServiceEditFormSubmit = (event)=>{
        event.preventDefault();
        const updatedService = serviceData.map((service) =>
        service.serviceKey === currentService.serviceKey ? currentService : service
        );
        // close editing window
        setEditWindow(!editWindow);
        // update the serviceData
        setServiceData(updatedService);
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
                    X
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
                                        <input type="file" name="" />
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
