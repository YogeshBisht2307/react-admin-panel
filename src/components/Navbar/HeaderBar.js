import React from 'react'
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { getCookie } from '../utility/cookies';

const HeaderBar = ({navCollapse,setNavCollapse}) => {
    const navigate = useNavigate();
    let authToken = getCookie('auth_token')

    const handleLogout = () => {
        document.cookie = "auth_token=; expires=Thu, 01 Jan 2020 00:00:00 UTC; path=/; SameSite=lax; Secure";
        document.cookie = "user_name=; expires=Thu, 01 Jan 2020 00:00:00 UTC; path=/; SameSite=lax; Secure";
        document.cookie = "photo_url=; expires=Thu, 01 Jan 2020 00:00:00 UTC; path=/; SameSite=lax; Secure";
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
