import React, { useState } from 'react'

import DeleteService from './DeleteService';
import EditService from './EditService';

const DisplayTable = ({loader, setLoader, serviceData, setServiceData}) => {
    const [currentEditItem, setCurrentEditItem] = useState({});
    const [editPopup, setEditPopup] = useState(false)
    const [currentDelItem, setCurrentDelItem] = useState({});
    const [delPopup, setDelPopup] = useState(false);

    const handleDeletePopup = (service) => {
        setDelPopup(!delPopup)
        setCurrentDelItem(service);
    }

    const handleEditPopup = (service) => {
        setEditPopup(!editPopup);
        setCurrentEditItem(service);
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
                                    <button className='button' onClick={()=> handleEditPopup(service)}>Edit</button>
                                </td>
                                <td className='delete'>
                                    <button className='button' onClick={() => handleDeletePopup(service)}>Delete</button>
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
            {/* delete window */}
            
           <DeleteService
                loader = {loader}
                delPopup = {delPopup} 
                setDelPopup = {setDelPopup}
                currentDelItem = {currentDelItem}
                setLoader = {setLoader}
                serviceData = {serviceData}
                setServiceData = {setServiceData}
            />
            <EditService
                loader = {loader}
                editPopup = {editPopup}
                setEditPopup = {setEditPopup}
                currentEditItem = {currentEditItem}
                setCurrentEditItem = {setCurrentEditItem}
                setLoader = {setLoader}
                serviceData = {serviceData}
                setServiceData = {setServiceData}
            />
        </div>
    )
}

export default DisplayTable
