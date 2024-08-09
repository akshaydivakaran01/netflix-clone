import React, { useState } from 'react'
import './Profile.css'
import logo from '../../assets/Netflix_Logo.png'
import edit_icon from '../../assets/edit_icon.png'
import password_icon from '../../assets/password_icon.png'
import delete_icon from '../../assets/delete_icon.png'
import back_icon from '../../assets/back_icon.png'
import { logout, deleteUserDetails, auth, updateName, changePassword } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

    const navigate = useNavigate(null)
    
    const [isEditName, setIsEditName] = useState(false)
    const [name, setName] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isUpdatePassword, setIsUpdatePassword] = useState(false)

    const user = auth.currentUser;

  return (
    user?
    <div className="profile-page">
      <header className="header-bar">
        <img src={logo} alt="Netflix Logo" className="netflix-logo" />
        <button className="logout" 
        onClick={() => {
            logout()
        }}>Logout</button>
      </header>
        <button className='back-button' onClick={() => navigate(-1)}><img src={back_icon} alt='Back button' className='back-to-netflix'></img>Back to Netflix</button>
      <div className="profile-wrapper">
        <div className="profile-content">
            <h1>Account</h1>
            <p>Membership details</p>
                <div className='account-details'>
                    <p>Name: <span>{user?.displayName}</span></p>
                    <p>Email: <span>{user?.email}</span></p>
                </div>
            <div className="quick-links">
                <p>Quick Links</p>
                <ul className='link-list'>
                    <li onClick={() => {
                        setIsEditName(!isEditName)
                    }}><img src={edit_icon} alt="Edit Logo"/>Edit Name</li>
                    {isEditName? 
                    <span>
                        <input className='name-update' type='text' placeholder='Name' value={name} onChange={(e) => {
                            setName(e.target.value)
                        }}></input>
                    <button type='button'
                    onClick={ async()=> {
                        name? 
                        (updateName(name), setIsEditName(!isEditName), user.displayName = name) : null;
                    }}>Save</button></span>: null}
                    <li onClick={() => {
                        setIsUpdatePassword(true)
                        setShowModal(true)
                    }}><img src={password_icon} alt="Edit Logo"/>Update Password</li>
                    <li onClick={() => {
                        setShowModal(true)
                        setIsUpdatePassword(false)
                    }}><img src={delete_icon} alt="Delete Logo"/>Delete Account</li>
                </ul>
            </div>
        </div>
      </div>
      {showModal? (isUpdatePassword? (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Password</h2>
                        <input
                            type="password"
                            className='modal-input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Current Password"
                        />
                        <input
                            type="password"
                            className='modal-input'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                        />
                        
                        <button className='modal-btn' onClick={() => {
                            changePassword(password, newPassword);
                            setShowModal(false);
                        }}>
                            Submit
                        </button>
                        <button className='modal-btn' onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>) : (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Re-enter Password to delete account</h2>
                        <input
                            type="password"
                            className='modal-input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <button className='modal-btn' onClick={() => {
                            deleteUserDetails(password);
                            setShowModal(false);
                        }}>
                            Submit
                        </button>
                        <button className='modal-btn' onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )) : ''}
    </div> : navigate('/signup')
  )
}

export default Profile