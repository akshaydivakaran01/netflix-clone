import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/Netflix_Logo.png';
import search_icon from '../../assets/search_icon.svg';
import notification_icon from '../../assets/notification_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { auth, logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';

const Navbar = ({ scrollToSection }) => {

    const navigate = useNavigate(null);

    const {setIsDisplayFavorites} = useAppContext();

    const navRef = useRef(null);

    const user = auth.currentUser;

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (navRef.current) {
                if(window.scrollY >= 80){
                    navRef.current.classList.add('nav-dark');
                }
                else {
                    navRef.current.classList.remove('nav-dark');
                }
            }
        })
    }, [])

    return (
        <div ref={navRef} className='navbar'>
            <div className="navbar-left">
                <img src={logo} alt="Netflix-logo" />
                <ul>
                    <li onClick={() => {
                        setIsDisplayFavorites(false)
                        navigate('/')}}> Home 
                    </li>
                    <li onClick={() => {
                        setIsDisplayFavorites(false)
                        scrollToSection('tvShows')}}> TV Shows
                    </li>
                    <li onClick={() => {
                        setIsDisplayFavorites(false)
                        scrollToSection('movies')}}> Movies 
                    </li>
                    <li onClick={() => {
                        setIsDisplayFavorites(false)
                        scrollToSection('popular')}}> New & Popular
                    </li>
                    <li onClick={() => {
                        setIsDisplayFavorites(true)
                        navigate('/my-list')}}> My List 
                    </li>
                    <li>Browse by Languages</li>
                </ul>
            </div>    
            <div className="navbar-right">
                <img src={search_icon} 
                    className='icons' 
                    alt="Search-icon" />
                <p> Children </p>
                <img src={notification_icon} 
                    className='icons' 
                    alt="Notification-icon" />
                <div className="navbar-profile">
                    <img src={profile_img} 
                        className='profile' 
                        alt="profile-icon" />
                    <img src={caret_icon}
                        className='dropdown-icon' 
                        alt="Dropdown-icon" />
                    <div className='dropdown'>
                        <div className="profile-item">
                            <img src={profile_img} alt="profile-icon"/>
                            <span>{user?.displayName}</span>
                        </div>
                        <div className="settings">
                            <p className="menu-item"
                                onClick={() => {
                                    navigate('/profile')
                                }}> Manage Profiles
                            </p>
                            <p className="menu-item"
                                onClick={() => {
                                    navigate('/my-list')
                                }}> My List
                            </p>
                            <p className="menu-item"
                                onClick={() => {
                                    navigate('/profile')
                                }}> Account 
                            </p>
                            <p className="menu-item" 
                                onClick={() => {
                                    navigate('/profile')
                                }}> Help Centre
                            </p>
                            <hr></hr>
                            <p className="menu-item"
                                onClick={logout}> Sign out of Netflix </p>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
  )
}

export default Navbar