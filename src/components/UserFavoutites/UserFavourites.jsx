import React, { useEffect, useState } from 'react'
import './UserFavourites.css'
import { useAppContext } from '../../context/appContext';
import play_btn from '../../assets/play_btn.png'
import close_icon from '../../assets/close_icon.png'
import { useNavigate } from 'react-router-dom';

const UserFavourites = () => {

  const [isMyList, setIsMyList] = useState(true);

  const {myList, likedList, setMyList, setLikedList} = useAppContext();

  const navigate = useNavigate();

  const removeFromMyList = (movie) => {
    setMyList((prevMyList) => 
        prevMyList.filter(m => m.id !== movie.id && m.title !== movie.title)
    );
    console.log('Removing...')
}

const removeFromLikedList = (movie) => {
    setLikedList((prevLikedList) =>      
      prevLikedList.filter(m => m.id !== movie.id && m.title !== movie.title)
    );
    console.log('Removing...')
}

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
    
  return (
    <div className='fav'>
      <div className='btn-area'>
        <button 
        type='button' 
        className = {`switch-btn ${isMyList === true && 'active'}`}
        onClick={() => setIsMyList(!isMyList)}>My List</button>
        <button 
        type='button' 
        className = {`switch-btn ${isMyList === false && 'active'}`}
        onClick={() => setIsMyList(!isMyList)}>Liked Movies and TV Shows</button>
      </div>
      <div className="fav-list">
        {isMyList? 
          <div className="fav-container">
            {myList.map((movie) => (
                <div className="fav-card" key={movie.id}>
                    <img
                        className='poster'
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt="Poster"
                    />
                    <img className='close-icon'
                    src={close_icon}
                    alt='Close icon'
                    onClick={() => {
                      removeFromMyList(movie)}}/>
                    <img className='play-icon'
                    src={play_btn}
                    alt='Play icon'
                    onClick={() => {
                      navigate(`/player/${movie.id}`)}}/>
                </div>
            ))}
          </div> : 
          <div className="fav-container">
          {likedList.map((movie) => (
              <div className="fav-card" key={movie.id}>
                  <img
                      className='poster'
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="Poster"/>
                  <img className='close-icon'
                    src={close_icon}
                    alt='Close icon'
                    onClick={() => {
                      removeFromLikedList(movie)}}/>
                  <img className='play-icon'
                    src={play_btn}
                    alt='Play icon'
                    onClick={() => {
                      navigate(`/player/${movie.id}`)}}/>
              </div>
          ))}
        </div>
        }
      </div>
    </div>
  )
}

export default UserFavourites