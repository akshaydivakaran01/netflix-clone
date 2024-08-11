import React, { useState } from 'react';
import logo from '../../assets/Netflix_Logo.png'; 
import './ResetPassword.css';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordWithEmail } from '../../firebase';
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const [email, setEmail] = useState('');

    const navigate = useNavigate(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            ResetPasswordWithEmail(email);
            navigate('/login');
        } else {
            toast.error('Please enter a valid email !', {position: "top-center", autoClose: 3000 });
        }
    };

    return (
        <div className="reset-password-container">
            <header className="reset-password-header">
                <img src={logo} 
                    className='signup-Logo' 
                    alt="Login-Logo" />

                <div className="header-right">
                    <p className="signin-link"
                        onClick={() => {
                        navigate('/login')
                        }}> Sign In
                    </p>
                </div>
            </header>

            <div className='reset-password-form-wrapper'>
                <form className="reset-password-form" onSubmit={handleSubmit}>
                    <div className="reset-password-input">
                        <h1> Update password </h1>
                        <p> We will send you an email with instructions on how to reset your password. </p>
                        <input 
                            type="text"
                            placeholder="Enter your email address"
                            value={email} 
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <button type="submit" className="reset-password-submit"> Email Me </button>
                </form>
            </div>
        </div>
  )
}

export default ResetPassword