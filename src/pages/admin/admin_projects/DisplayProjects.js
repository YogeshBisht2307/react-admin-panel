import React, { useState } from 'react'

import EditProject from './EditProject';
import DeleteProject from './DeleteProject';

const DisplayProjects = ({loader, setLoader, projectsData, setProjectsData}) => {
    const initialEditItemState = {
        'projectKey': "",
        'projectTitle' : "",
        'projectDate' : "",
        'projectDetail' : "",
        'projectLink' : "",
        'projectTechTitle' : "",
        'projectImageUrl' : "",
        'deleted' : false,
    }
    const [currentEditItem, setCurrentEditItem] = useState(initialEditItemState);
    const [editPopup, setEditPopup] = useState(false);
    const [currentDelItem, setCurrentDelItem] = useState({});
    const [delPopup, setDelPopup] = useState(false);

    const handleDeletePopup = (project) => {
        setDelPopup(!delPopup);
        setCurrentDelItem(project);
    }

    const handleEditPopup = (project) => {
        setEditPopup(!editPopup);
        setCurrentEditItem(project);
    }
    return (
        <div className="content-table" style={{overflowX : 'auto'}}>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Link</th>
                    <th>Tech Stack</th>
                    <th>Image</th>
                    <th>Detail</th>
                    <th colSpan="2">Action</th>
                </tr>
                </thead>
                <tbody>
                    {projectsData.map((project, index) => {
                        return (
                            <tr key={index}>
                                <td className='table_column_item'>{project.projectTitle}</td>
                                <td className='table_column_item'>{project.projectDate}</td>
                                <td className='table_column_item'>{project.projectLink}</td>
                                <td className='table_column_item'>{project.projectTechTitle}</td>
                                <td className='table_column_item'>{project.projectImageUrl}</td>
                                <td className='table_column_item'>{project.projectDetail}</td>
                                <td className='table_column_item edit'>
                                    <button className='button' onClick={()=> handleEditPopup(project)}>Edit</button>
                                </td>
                                <td className='table_column_item delete'>
                                    <button className='button' onClick={() => handleDeletePopup(project)}>Delete</button>
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
            <DeleteProject
                loader = {loader}
                delPopup = {delPopup} 
                setDelPopup = {setDelPopup}
                currentDelItem = {currentDelItem}
                setLoader = {setLoader}
                setProjectsData = {setProjectsData}
            />

            <EditProject
                loader = {loader}
                editPopup = {editPopup}
                setEditPopup = {setEditPopup}
                currentEditItem = {currentEditItem}
                setCurrentEditItem = {setCurrentEditItem}
                setLoader = {setLoader}
                setProjectsData = {setProjectsData}
            />
        </div>
    )
}

export default DisplayProjects;
