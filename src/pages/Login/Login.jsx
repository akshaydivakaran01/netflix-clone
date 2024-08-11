import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/Netflix_Logo.png';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { login } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const user_auth = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login(email, password);
        setLoading(false);
    }
  
    return (
    loading ? 
    <div className="login-spinner"> 
        <img src={netflix_spinner} 
             alt="loading" /> 
    </div> 
    
    :

    <div className='login'>
        <img src={logo} 
            className='login-logo' 
            alt="Login-Logo" />
        <div className="login-form">
            <h1>Sign In</h1>
            <form>
                <input type="email" 
                    placeholder='Email'
                    value={email}
                    required
                    autoComplete="email" 
                    onChange={(e) => {
                    setEmail(e.target.value)
                    }}/>                     
                <input type="password" 
                    placeholder='Password'
                    value={password}
                    required
                    autoComplete="current-password"
                    onChange={(e) => {
                    setPassword(e.target.value)
                    }}/>
                <button type='submit'
                    onClick={user_auth}> Sign In
                </button>

                <p className='forgot-password'
                onClick={() => {
                    navigate('/login-help')
                }}> Forgot password? </p>
                <div className="remember">
                    <input type="checkbox" 
                        name="remember" 
                        id="remember" />
                    <label htmlFor="remember"> Remember Me </label>
                </div>
            </form>
            <div className="form-switch">
                <p> New to Netflix? 
                    <span onClick={() => {
                        navigate('/signup')
                        }}> Sign Up Now
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login