import React, { useState } from 'react';
import EditTechStack from './EditTechStack';
import DeleteTechStack from './DeleteTechStack';

const DisplayTechStack = ({ loader, setLoader, techStackData, setTechStackData }) => {
    const initialEditItemState = {
        'tech_stackKey': "",
        'tech_stackId' : "",
        'tech_stackTitle' : "",
        'tech_stackCategory':"",
        'tech_stackImageUrl' : "",
        'deleted' : false,
    };
    const [currentEditItem, setCurrentEditItem] = useState(initialEditItemState);
    const [editPopup, setEditPopup] = useState(false);
    const [currentDelItem, setCurrentDelItem] = useState({});
    const [delPopup, setDelPopup] = useState(false);

    const handleDeletePopup = (tech_stack) => {
        setDelPopup(!delPopup);
        setCurrentDelItem(tech_stack);
    }

    const handleEditPopup = (tech_stack) => {
        setEditPopup(!editPopup);
        setCurrentEditItem(tech_stack);
    }
    return (
        <div className="content-table" style={{overflowX : 'auto'}}>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th colSpan="2">Action</th>
                </tr>
                </thead>
                <tbody>
                    {techStackData.map((tech_stack, index) => {
                        return (
                            <tr key={index}>
                                <td className='table_column_item'>{tech_stack.tech_stackTitle}</td>
                                <td className='table_column_item'>{tech_stack.tech_stackCategory}</td>
                                <td className='table_column_item'>{tech_stack.tech_stackImageUrl}</td>
                                <td className='table_column_item edit'>
                                    <button className='button' onClick={()=> handleEditPopup(tech_stack)}>Edit</button>
                                </td>
                                <td className='table_column_item delete'>
                                    <button className='button' onClick={() => handleDeletePopup(tech_stack)}>Delete</button>
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
            <DeleteTechStack
                loader = {loader}
                delPopup = {delPopup} 
                setDelPopup = {setDelPopup}
                currentDelItem = {currentDelItem}
                setLoader = {setLoader}
                setTechStackData = {setTechStackData}
            />

            <EditTechStack
                loader = {loader}
                editPopup = {editPopup}
                setEditPopup = {setEditPopup}
                currentEditItem = {currentEditItem}
                setCurrentEditItem = {setCurrentEditItem}
                setLoader = {setLoader}
                setTechStackData = {setTechStackData}
            />
        </div>
    )
}

export default DisplayTechStack;