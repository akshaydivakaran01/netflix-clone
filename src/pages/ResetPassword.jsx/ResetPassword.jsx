import React, { useState } from 'react'
import logo from '../../assets/Netflix_Logo.png'    
import './ResetPassword.css'
import { useNavigate } from 'react-router-dom';
import { ResetPasswordWithEmail } from '../../firebase';

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const navigate = useNavigate(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((email)) {
            ResetPasswordWithEmail(email)
            navigate('/login')
        } else {
            alert('Please enter a valid email address.');
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-header">
            <img src={logo} 
             className='signup-Logo' 
             alt="Login-Logo" />

            <div className="header-right">
                <p className="signin-link"
                onClick={() => {
                    navigate('/login')
                }}>Sign In</p>
            </div>
        </div>
        <div className='reset-password-form-wrapper'>
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <div className="reset-password-input">
                    <h1>Update password</h1>
                    <p>We will send you an email with instructions on how to reset your password.</p>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }} 
                        placeholder="Enter your email address"
                    />
                </div>
                <button type="submit" className="reset-password-submit">
                    Email Me
                </button>
            </form>
        </div>
        </div>
  )
}

export default ResetPassword