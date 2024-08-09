import React, { useState } from 'react';
import './SignUp.css';
import logo from '../../assets/Netflix_Logo.png'
import right_arrow from '../../assets/right_arrow.png'
import { useNavigate } from 'react-router-dom';
import { signup } from '../../firebase'

const SignupPage = () => {

    const [getForm, setGetForm] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const navigate = useNavigate(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
          alert('Password is required.');
        } else {
          await signup(name, email, password)
        }
      };

  return (
    getForm ? 
    <div className="register-form">
      <header className="header">
        <img src={logo} alt="Netflix Logo" className="logo" />
        <button className="sign-in" 
        onClick={() => {
            navigate('/login')
        }}>Sign In</button>
      </header>
      <div className="content-wrapper">
      <div className="content">
        <p className="signup-title">Create a password to start your membership</p>
        <p className="description">Just one step and you're done! <br/>We hate paperwork, too.</p>
        <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
            <input type="text"
              id="name"
              className="name-input" 
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}  />
          </div>
          <div className="input-group">
            <input type="email"
              id="email"
              className="signup-email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  />
          </div>
          <div className="input-group">
            <input type="password"
              id="password"
              className="password-input"
              placeholder="Add a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="next-button">Create Account</button>
        </form>
      </div>
      </div>
    </div>    
    
    :

    <div className='signup'>
    <header className='signup-header'>
        <img src={logo} 
             className='signup-Logo' 
             alt="Login-Logo" />

        <div className="header-right">
            <select className="language-select">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
            </select>
            <button className="signin-button"
            onClick={() => {
                navigate('/login')
            }}>Sign In</button>
        </div>
    </header>

        <div className="signup-content">
            <h1>Unlimited movies, TV shows and more</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="email-form">
            <input type="email" placeholder="Email address" className="email-input" 
            value={email} 
            required
            onChange={(e) => {
                setEmail(e.target.value)
            }}/>
            <button className="get-started-button"
            onClick={() => {
                setGetForm(true);
            }}>Get Started<img src={right_arrow} alt="button-image" width='20px'/></button>
            </div>
        </div>
    </div>
  );
};

export default SignupPage;
