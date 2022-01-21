import React from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from "./cookies";

import './404.css'

const NoRoutePage = () => {
    let authToken = getCookie('auth_token')
    return (
        <section className='nofound_page'>
            <div className='nofound_container'>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="main">
                <h1>404</h1>
                <p>It looks like you're lost...<br/>That's a trouble?</p>
                <Link to={authToken ? '/admin/dashboard': '/'}><button type="button">Go back</button></Link>
                </div>
            </div>
        </section>
    )
}

export default NoRoutePage;
