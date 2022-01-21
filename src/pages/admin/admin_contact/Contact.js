import React,{ useState, useEffect } from 'react'

import { ref as reference, onValue, update } from "firebase/database";
import { db } from '../../../firebase.config';
import ScreenLoader from '../../../components/utility/Loader';
import { toast } from 'react-toastify';
import './contact.css';

import DeleteContact from './DeleteContact';

const AdminContact = React.memo(() => {
    const [contactList, setContactList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [currentDelItem, setCurrentDelItem] = useState({});
    const [delPopup, setDelPopup] = useState(false);

    const tableToCSV = (data_table) => {
        // Variable to store the final csv data
        var csv_data = [];
        // Get each row data
        var rows = document.querySelectorAll(`#${data_table} tr`);
        for (var i = 0; i < rows.length; i++) {
            // Get each column data
            var cols = rows[i].querySelectorAll(`#${data_table} td, #${data_table} th`);

            // Stores each csv row data
            var csvrow = [];
    
            if (i===0){
                csvrow.push("S.No.");
            }
            if (i!==0){
                csvrow.push(i);
            }
            if (i===rows.length-1) continue;

            for (var j = 0; j < cols.length; j++) {

                // Get the text data of each cell
                // of a row and push it to csvrow
                if (i===0 && j===5){
                    csvrow.push("Replied");
                    continue;
                }
                if (j===5){
                    csvrow.push(cols[5].getAttribute('data'));
                    continue;
                }
                if (j===6) continue;
                csvrow.push(cols[j].innerHTML);
            }
            // Combine each column value with comma
            csv_data.push(csvrow.join(","));
        }
        // Combine each row data with new line character
        csv_data = csv_data.join('\n');
        // create .csv file
        const CSVFile = new File([csv_data], "portfolio_contact_data_list.csv", {
            type: "text/csv"
        });
        return CSVFile;
    }

    const downloadFile = (data_table) => {
        const file = tableToCSV(data_table);
        // Create to temporary link to initiate
        // download process
        var temp_link = document.createElement('a');

        // Download csv file
        temp_link.download = "portfolio_contact_data_list.csv";
        var url = window.URL.createObjectURL(file);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        // Automatically click the link to
        // trigger download
        temp_link.click();
        document.body.removeChild(temp_link);

    }

    const handleDeletePopup = (contact) => {
        setDelPopup(!delPopup)
        setCurrentDelItem(contact);
    }

    const handleReplied = (event, repliedItem) => {
        setContactList([]);
        setLoader(true);
        let repliedData = event.target.parentElement.getAttribute('data')
        if (repliedData === "true") repliedData=false;
        if (repliedData === "false") repliedData=true
        update(reference(db, 'portfolio/contact_mails/' + repliedItem.contactKey), {
            replied : repliedData
        }).catch((error) => {
            console.log(error);
            setLoader(false);
            toast.error("Unable to replied 😒");
        }).then(() => {
            toast.success(`You have ${event.target.innerHTML} this User ! 😎`);
            setLoader(false);
        })
    }

    const fetchData = () => {
        setLoader(true)
        const contactRef = reference(db, 'portfolio/contact_mails/')
        onValue(contactRef, (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                let data = childSnapshot.val();
                if (data.deleted === false){
                    setContactList(arr => 
                        [...arr, {
                            contactKey: childSnapshot.key,
                            contactId : data.contactId,
                            name: data.name,
                            email: data.email,
                            subject: data.subject,
                            message: data.message,
                            created: data.created,
                            replied: data.replied
                        }]
                    )
                }
            });
            setLoader(false);
        });
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
        {/* adding element */}
            <div className="main">
                <div className="addElement">
                    <div className="addElementHeader">
                        <p>Contact List</p>
                        <button className='button' onClick={() => downloadFile("contact_data_table")}>Download File</button>
                    </div>
                    <div className="content" style={{display: 'block'}}>
                        <div className="content-table" style={{overflowX : 'auto'}}>
                            <table id="contact_data_table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Created</th>
                                    <th colSpan="2">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Data</td>
                                        <td>Data</td>
                                        <td>Data</td>
                                        <td>Data</td>
                                        <td>Data</td>
                                        <td className='replied' data="true" >
                                            <button className='button'>Replied</button>
                                        </td>
                                        <td className='delete'>
                                            <button className='button'>Delete</button>
                                        </td>
                                    </tr>
                                    {contactList.map((contact, index) => {
                                        return (
                                    <tr key={index}>
                                        <td className='table_column_item'>{contact.name}</td>
                                        <td className='table_column_item'>{contact.email}</td>
                                        <td className='table_column_item'>{contact.subject}</td>
                                        <td className='table_column_item'>{contact.message}</td>
                                        <td className='table_column_item'>{contact.created}</td>
                                        <td className='table_column_item replied' data={contact.replied.toString()} >
                                            <button className='button' onClick={(e) => handleReplied(e, contact)}>{contact.replied ? "Replied": "Not-Replied"}</button>
                                        </td>
                                        <td className='table_column_item delete'>
                                            <button className='button' onClick={() => handleDeletePopup(contact)}>Delete</button>
                                        </td>
                                    </tr>
                                     )
                                    })}
                                </tbody>
                            {/* table footer */}
                                <tfoot>
                                    <tr>
                                    <th colSpan='7'>Date: {new Date().getDate() + "-" + (new Date().getMonth()+1) + "-" + new Date().getFullYear()}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                <DeleteContact
                loader = {loader}
                delPopup = {delPopup} 
                setDelPopup = {setDelPopup}
                currentDelItem = {currentDelItem}
                setLoader = {setLoader}
                contactList = {contactList}
                setContactList = {setContactList}
            />
            </div>
        </div>
    )
})

export default AdminContact;
