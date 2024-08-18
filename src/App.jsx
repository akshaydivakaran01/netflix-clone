import React, { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, fetch_Data } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/SignUp/SignUp';
import { useAppContext } from './context/appContext';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Profile from './pages/Profile/Profile';
import ResetPassword from './pages/ResetPassword.jsx/ResetPassword';
import Spinner from './components/Spinner/Spinner';

const App = () => {

  const {setMyList, setLikedList, setIsDisplayFavorites, isLoading, setIsLoading } = useAppContext();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    
    setIsLoading(true)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user) {
        console.log("Logged In");
        const getUserData = async () => {
          const data = await fetch_Data();
          if (data) {
            setMyList(data.My_List);
            setLikedList(data.Liked_List);
          }
        };
        await getUserData();
        navigate('/', { replace: true });
      }
      else{
        navigate('/signup', { replace: true });
      }

      setIsLoading(false); 
    });

    window.scrollTo(0, 0);

    return () => unsubscribe();

  }, [])

  useEffect(() => {
    if (location.pathname === '/my-list') {
      setIsDisplayFavorites(true);
    }
    else{
      setIsDisplayFavorites(false);
    }
}, [location.pathname]);

  return (
    <>
      < ToastContainer theme='dark' pauseOnHover= {false}/>
      {isLoading? < Spinner  /> : <Routes />}
      < Routes >
        {auth.currentUser ? (
        <>
          <Route path='/' element={<Home />} />
          <Route path='/player/:id' element={<Player />} />
          <Route path='/my-list' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </>
        ) : (
        <>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login-help' element={<ResetPassword />} />
          <Route path='*' element={<ErrorPage />} /> 
        </>
        )}
      </Routes >
    </>
  )
}

export default App