import React,{ useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import ScreenLoader from '../../../components/utility/Loader';

const UpdateAdminProfile = () => {
    const user_info = {
        'name': '',
        'email': '',
        'imageUrl': '',
    }
    const [loader, setLoader] = useState(false);
    const [userInfo, setUserInfo] = useState(user_info);

    
    const fetchUserInfo = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserInfo({
                    name: user.displayName,
                    email: user.email,
                    imageUrl: user.photoURL
                })
            } else {
                console.log("User signout");
            }
        });
    }
    useEffect(() => {
        fetchUserInfo();
    }, [])
    if (loader){
        return (
            <ScreenLoader/>
        )
    }
    return (
        <div className="container">
            <div className="main">
                <div className="addElement">
                    <div className="addElementHeader">
                        <p>Admin User Info</p>
                    </div>
                    <div className="content" 
                        style = {{
                                display: "flex" 
                            }}
                        >
                        <div className="form_wrapper">
                            <div className="form_container">
                                <div className="content-table" style={{overflowX : 'auto'}}>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Photo</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='table_column_item'>{userInfo.name}</td>
                                                <td className='table_column_item'>{userInfo.email}</td>
                                                <td className='table_column_item'>{userInfo.imageUrl}</td>
                                                <td className='table_column_item edit'>
                                                    <button className='button' >Edit</button>
                                                </td>
                                            </tr>
                                        
                                        </tbody>
                                    {/* table footer */}
                                        <tfoot>
                                            <tr>
                                                <th colSpan='5'>Date: {new Date().getDate() + "-" + (new Date().getMonth()+1) + "-" + new Date().getFullYear()}</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default UpdateAdminProfile;
