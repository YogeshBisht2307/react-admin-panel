import React, { useState } from 'react';

import DeleteService from './DeleteService';
import EditService from './EditService';

const DisplayServices = ({ loader, setLoader, serviceData, setServiceData }) => {
    const initialEditItemState = {
        'serviceKey':"",
        'serviceTitle':"", 
        'serviceDetail':"",
        'serviceImageFont': "",
        'serviceId':""
    };
    const [currentEditItem, setCurrentEditItem] = useState(initialEditItemState);
    const [editPopup, setEditPopup] = useState(false);
    const [currentDelItem, setCurrentDelItem] = useState({});
    const [delPopup, setDelPopup] = useState(false);

    const handleDeletePopup = (service) => {
        setDelPopup(!delPopup);
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
                    <th colSpan="2">Action</th>
                </tr>
                </thead>
                <tbody>
                    {serviceData.map((service, index) => {
                        return (
                            <tr key={index}>
                                <td className='table_column_item'>{service.serviceTitle}</td>
                                <td className='table_column_item'>{service.serviceDetail}</td>
                                <td className='table_column_item'>{service.serviceImageFont}</td>
                                <td className='table_column_item edit'>
                                    <button className='button' onClick={()=> handleEditPopup(service)}>Edit</button>
                                </td>
                                <td className='table_column_item delete'>
                                    <button className='button' onClick={() => handleDeletePopup(service)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            {/* table footer */}
                <tfoot>
                    <tr>
                    <th colSpan='5'>Date: {new Date().getDate() + "-" + (new Date().getMonth()+1) + "-" + new Date().getFullYear()}</th>
                    </tr>
                </tfoot>
            </table>

           <DeleteService
                loader = {loader}
                delPopup = {delPopup} 
                setDelPopup = {setDelPopup}
                currentDelItem = {currentDelItem}
                setLoader = {setLoader}
                setServiceData = {setServiceData}
            />
            
            <EditService
                loader = {loader}
                editPopup = {editPopup}
                setEditPopup = {setEditPopup}
                currentEditItem = {currentEditItem}
                setCurrentEditItem = {setCurrentEditItem}
                setLoader = {setLoader}
                setServiceData = {setServiceData}
            />
        </div>
    )
}

export default DisplayServices;
