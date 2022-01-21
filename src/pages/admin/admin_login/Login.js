import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {signInWithEmailAndPassword ,sendPasswordResetEmail} from 'firebase/auth';
import {app, authentication} from '../../../firebase.config';

import { toast } from 'react-toastify';
import { setCookie,getCookie } from '../../../components/utility/cookies';

import ScreenLoader from '../../../components/utility/Loader';

import './login.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loader, setLoader] = useState(false);
    
    let authToken = getCookie('auth_token')
    authToken && navigate("/admin/dashboard");

    let authToken = getCookie('auth_token')
    authToken && navigate("/admin/dashboard");

    const onLogin = (event) => {

        setLoader(true);
        event.preventDefault();

        signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
            setCookie('auth_token', response._tokenResponse.refreshToken);
            setCookie('user_name', response.user.displayName);
            setCookie('photo_url', response.user.photoURL);
            setLoader(false);
            navigate("/admin/dashboard");
            //   navigate(state?.path || "/dashboard");
            toast.success("Welcome back! 😎");   
        })
        .catch((error) => {
            console.log(error.code);
            setLoader(false);
            if (error.code === 'auth/wrong-password') {
                toast.error('Please check the Password! 😏');
            }
            if (error.code === 'auth/user-not-found') {
                toast.error('Please check the Email! 😵‍💫');
            }
            if(error.code === 'auth/timeout'){
                toast.error('Request timeout ! try again later');
            }
        })
    }

    const resetPassoword = (event) => {
        event.preventDefault();
        setLoader(true);
        sendPasswordResetEmail(authentication,email)
        .then(() => {
            setLoader(false);
            toast.success('Password Reset Email has send! 😊');
        })
        .catch((error) => {
            setLoader(false);
            console.log(error.code);
            if(error.code === 'auth/missing-email'){
                toast.error('Email is required! 😒');
            }
            if(error.code === 'auth/user-not-found'){
                toast.error('Please check the Email! 😵‍💫');
            }
            if(error.code === 'auth/timeout'){
                toast.error('Request timeout ! try again later');
            }
        })
    }

    if(loader){
        return (
            <ScreenLoader/>
        )
    }
    return (
            <section className="login-section">
                <div className="login-form">
                    <div className="login-form-panel">
                        <div className="form-header">
                            <h1>Account Login</h1>
                        </div>
                        <div className="form-content">
                            <form onSubmit={onLogin}>
                                <div className="form-group">
                                    <label htmlFor="username">Email</label>
                                    <input id="email" type="email" name="email" onChange={(e)=>setEmail(e.target.value)} required="required"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input id="password" type="password" name="password" onChange={(e)=> setPassword(e.target.value)} required="required"/>
                                </div>
                                <div className="form-group">
                                    <p className="form-recovery" onClick={resetPassoword}>Forgot Password?</p>
                                </div>
                                <div className="form-group">
                                    <button type="submit">Log In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default AdminLogin;