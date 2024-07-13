import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/Netflix_Logo.png'
import search_icon from '../../assets/search_icon.svg'
import notification_icon from '../../assets/notification_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'


const Navbar = () => {

    const navRef = useRef(null);

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
            <img src={logo} 
                 alt="Netflix-logo" />
            <ul>
                <li>Home</li>
                <li>TV Shows</li>
                <li>Movies</li>
                <li>New & Popular</li>
                <li>My List</li>
                <li>Browse by Languages</li>
            </ul>
        </div>    
        <div className="navbar-right">
            <img src={search_icon} 
                 className='icons' 
                 alt="Search-icon" />
            <p>Children</p>
            <img src={notification_icon} 
                 className='icons' 
                 alt="Notification-icon" />
            <div className="navbar-profile">
                <img src={profile_img} 
                     className='profile' 
                     alt="profile-icon" />
                <img src={caret_icon} 
                     alt="Dropdown-icon" />
                <div className='dropdown'>
                    <p onClick={() => {
                        logout()
                    }}>Sign out of Netflix</p>
                </div>
            </div>
        </div>    
    </div>
  )
}

export default Navbar