import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword ,sendPasswordResetEmail} from 'firebase/auth';

import {app, authentication} from '../../../firebase.config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './login.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const onLogin = (event) => {
      event.preventDefault();
      signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
          navigate("/admin/dashboard");
        //   navigate(state?.path || "/dashboard");
          toast.success("Welcome back! 😎");   
      })
      .catch((error) => {
          console.log(error.code)
          if (error.code === 'auth/wrong-password') {
              toast.error('Please check the Password! 😏');
          }
          if (error.code === 'auth/user-not-found') {
              toast.error('Please check the Email! 😵‍💫');
          }
      })
  }
  
  const resetPassoword = (event)=> {
      event.preventDefault();
      sendPasswordResetEmail(authentication,email)
      .then(() => {
          toast.success("Password Reset Email has send! 😊");
      })
      .catch((error) => {
          console.log(error.code);
          if(error.code === 'auth/missing-email'){
              toast.error('Email is required! 😒');
          }
          if(error.code === 'auth/user-not-found'){
              toast.error('Please check the Email! 😵‍💫');
          }
      })
  }

  return (
      <>
       <ToastContainer />
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
        </>
    );
};

export default AdminLogin;