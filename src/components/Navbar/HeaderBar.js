import React from 'react'
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const HeaderBar = ({navCollapse,setNavCollapse}) => {
    const navigate = useNavigate();
    let authToken = sessionStorage.getItem('Auth Token')

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate("/admin/login");
        toast("Good Bye, See You Soon! 😊");
    };
    return (
        <>
            <ToastContainer/>
            <div className="top_navbar">
                <div className="hamburger">
                    <p>
                        <i onClick={()=> setNavCollapse(!navCollapse)} className="fa fa-bars"></i>
                    </p>
                </div>
                <div className="logout">
                {authToken && (
                    <button onClick={handleLogout}>
                    Logout
                    </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default HeaderBar;
