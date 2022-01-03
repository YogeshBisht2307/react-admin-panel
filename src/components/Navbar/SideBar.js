import React from 'react'
import {Link} from 'react-router-dom';
import AdminImage from '../images/admin.JPG';
import { getCookie } from '../utility/cookies';

import './navbar.css';

const SideNavbar = () => {
    let user_name=getCookie('user_name');
    let photoURL=getCookie('photo_url');

    return (
        <div className="sidebar">
            <div className="profile">
                <img src={photoURL !== "" ? photoURL : AdminImage} style={{border:"2px solid white"}} alt="Yogesh Bisht"/>
                <h3>{user_name !=="" ? user_name : "Unknown"}</h3>
                <p>Full Stack Developer</p>
            </div>
            <ul>
                <li>
                    <Link to='/admin/dashboard' className="active">
                        <span className="icon"><i className="fa fa-home"></i></span>
                        <span className="item">My Dashboards</span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin/services'>
                        <span className="icon"><i className="fa fa-desktop"/></span>
                        <span className="item">Services</span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin/projects'>
                        <span className="icon"><i className="fa fa-newspaper-o"></i></span>
                        <span className="item">Projects</span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin/topskills'>
                        <span className="icon"><i className="fa fa-graduation-cap"></i></span>
                        <span className="item">TopSkills</span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin/techstacks'>
                        <span className="icon"><i className="fa fa-database"></i></span>
                        <span className="item">TechStack</span>
                    </Link>
                </li>
                <li>
                    <Link to='/admin/settings'>
                        <span className="icon"><i className="fa fa-cog"></i></span>
                        <span className="item">Settings</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideNavbar;
