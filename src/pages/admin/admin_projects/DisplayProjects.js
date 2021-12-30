import React, { useState } from 'react'

import EditProject from './EditProject';

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
    const [editPopup, setEditPopup] = useState(false)
    const [currentDelItem, setCurrentDelItem] = useState({});
    const [delPopup, setDelPopup] = useState(false);

    const handleDeletePopup = (project) => {
        setDelPopup(!delPopup)
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
                    {/* first row */}
                    {projectsData.map((project, index) => {
                        return (
                            <tr key={index}>
                                <td data-title='project_title'>{project.projectTitle}</td>
                                <td data-title='project_date'>{project.projectDate}</td>
                                <td data-title='project_link'>{project.projectLink}</td>
                                <td data-title='project_tech_title'>{project.projectTechTitle}</td>
                                <td data-title='project_image_url'>{project.projectImageUrl}</td>
                                <td data-title='project_detail'>{project.projectDetail}</td>
                                <td className='edit'>
                                    <button className='button' onClick={()=> handleEditPopup(project)}>Edit</button>
                                </td>
                                <td className='delete'>
                                    <button className='button' onClick={() => handleDeletePopup(project)}>Delete</button>
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
            <EditProject
                loader = {loader}
                editPopup = {editPopup}
                setEditPopup = {setEditPopup}
                currentEditItem = {currentEditItem}
                setCurrentEditItem = {setCurrentEditItem}
                setLoader = {setLoader}
                projectsData = {projectsData}
                setProjectsData = {setProjectsData}
            />
        </div>
    )
}

export default DisplayProjects;
