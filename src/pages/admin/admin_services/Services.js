import React,{useState} from 'react'
import {storage,database as db,} from '../../../firebase.config';
import {ref as reference, push } from "firebase/database";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import './services.css';

const AdminServices = () => {
    const [addRowCollapsible, setAddRowCollapsible] = useState(false);
    const [editWindow, setEditWindow] = useState(false);
    const [serviceImageFont, setServiceImageFont] = useState("");
    const [serviceTitle, setServiceTitle] = useState("")
    const [serviceDetail, setServiceDetail] = useState("")
    const [image, setImage] = useState("")
    const refhook = React.useRef();
    


    const submitData = async(e) => {
        e.preventDefault();
        const storageRef = ref(storage, 'images/' + image.name);
        // uploading image to firebase storage
        uploadBytes(storageRef, image)
            .catch(error =>{
                console.log(error);
                console.log("Error Occured during image uploading !...")
            })
            .then(() => {
                // fetching url of the uploaded storage image
                getDownloadURL(storageRef)
            })
            .catch(error => { 
                // resolving the error related to image upload
                console.log(error);
                console.log("Error occured during url handling!...")
            })
            .then((url) => {
                // adding service data to firebase server
                push(reference(db, 'services/',), {
                    serviceTitle: serviceTitle,
                    serviceDetail: serviceDetail,
                    serviceImageUrl: url,
                    serviceImageFont: serviceImageFont,
                  });
            }).catch(error => {
                console.log(error);
                console.log("Error occured during service data uploading!...")
            })
            .then(() =>{
                 // resetting the form data to again blank
                setServiceDetail("");
                setServiceImageFont("");
                setServiceTitle("");
                setImage("");
                refhook.current.value = ""
            })
    }
    console.log(serviceTitle, serviceDetail, image)
    return (
        <div className="container">
        {/* adding element */}
        <div className="main">
            <div className="addElement">
                <div className="addElementHeader"><p>Services List</p><button onClick={()=>setAddRowCollapsible(!addRowCollapsible)} className="collapsible">Add Service</button></div>
                <div className="content" style={{display: addRowCollapsible ? "flex" : "none" }}>
                    <div className="form_wrapper">
                        <div className="form_container">
                            <div className="title_container">
                                <h2>Add New Service</h2>
                            </div>
                            <div className="row">
                            {/* Add services form starts here */}
                                <form onSubmit={submitData}>
                                    <div className="form-row">
                                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                            <input type="text" name="title" placeholder="Title" value={serviceTitle} onChange={(e)=> setServiceTitle(e.target.value)}/>
                                        </div>
                                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                            <input type="text" name="image" placeholder="Image font url" value={serviceImageFont} onChange={(e)=>setServiceImageFont(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="input_field textarea_field"> <span><i aria-hidden="true" className="fa fa-book"></i></span>
                                            <textarea name="detail" rows="3" value={serviceDetail} onChange={(e)=> setServiceDetail(e.target.value)} placeholder="Service Detail"/>
                                        </div>
                                        <div className="input_field textarea_field">
                                            <input type="file"  ref={refhook} name="image" onChange={(e)=>setImage(e.target.files[0])}/>
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

            {/* table content */}
            <div className="content-table" style={{overflowX : 'auto'}}>
                <table>
                    <thead>
                    <tr>
                        <th>Provider Name</th>
                        <th>E-mail</th>
                        <th>Image</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* first row */}
                        <tr>
                            <td data-title='Provider Name'>Christoph Koller</td>
                            <td data-title='E-mail'>e-mail@test-email.com</td>
                            <td data-title='Image'>image/src/exe_jpg.png</td>
                            <td className='edit'>
                            <button className='button' id="edit" onClick={()=>setEditWindow(!editWindow)}>Edit</button>
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
                                            <form>
                                                <div className="form-row">
                                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                                        <input type="text" name="name" placeholder="Name"  required />
                                                    </div>
                                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                                        <input type="email" name="email" placeholder="Email" required />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                                        <input type="password" name="password" placeholder="Password" required />
                                                    </div>
                                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                                        <input type="text" name="confirm_password" placeholder="Confirm Password" required />
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
                            </td>
                            <td className='delete'>
                                <button className='button'>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                   {/* table footer */}
                    <tfoot>
                        <tr>
                        <th colSpan='3'>Year: 2021</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div> 
    )
}

export default AdminServices;
