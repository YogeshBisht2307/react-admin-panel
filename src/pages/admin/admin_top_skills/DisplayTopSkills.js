import React, {useState} from 'react'

const DisplayTopSkills = ({loader, setLoader, topSkillsData, setTopSkillsData}) => {
    const initialEditItemState = {
        'top_skillKey':"",
        'top_skillTitle':"", 
        'top_skillPoint':"",
        'top_skillId':""
    }
    const [currentEditItem, setCurrentEditItem] = useState(initialEditItemState);
    const [editPopup, setEditPopup] = useState(false)
    const [currentDelItem, setCurrentDelItem] = useState({});
    const [delPopup, setDelPopup] = useState(false);

    const handleDeletePopup = (top_skill) => {
        setDelPopup(!delPopup)
        setCurrentDelItem(top_skill);
    }

    const handleEditPopup = (top_skill) => {
        setEditPopup(!editPopup);
        setCurrentEditItem(top_skill);
    }
    return (
        <div className="content-table" style={{overflowX : 'auto'}}>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Point (Out of 10)</th>
                    <th colSpan="2">Action</th>
                </tr>
                </thead>
                <tbody>
                    {topSkillsData.map((top_skill, index) => {
                        return (
                            <tr key={index}>
                                <td className='table_column_item'>{top_skill.top_skillTitle}</td>
                                <td className='table_column_item'>{top_skill.top_skillPoint}</td>
                                <td className='table_column_item edit'>
                                    <button className='button' onClick={()=> handleEditPopup(top_skill)}>Edit</button>
                                </td>
                                <td className='table_column_item delete'>
                                    <button className='button' onClick={() => handleDeletePopup(top_skill)}>Delete</button>
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
        </div>
    )
}

export default DisplayTopSkills;
