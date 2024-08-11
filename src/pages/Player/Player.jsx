import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { getData } from '../../constants';

const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })
  
  useEffect( () => {
    getData(`movie/${id}/videos?language=en-US`)
    .then(response => setApiData(response.results[0]))
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [])

  
  return (
    apiData ?
    <div className='player'>
      <img src={back_arrow_icon} 
        alt="Back_Arrow_icon" 
        onClick={() => {
        navigate('/')
        }} />
      <iframe width="90%" 
              height="90%" 
              src={`https://www.youtube.com/embed/${apiData.key ? apiData.key : ''}?autoplay=1`} 
              allow="autoplay"
              title = "Trailer"  
              allowFullScreen 
              frameBorder='0' >
      </iframe>
      
      <div className="player-info">
        <p>{apiData?.published_at ? apiData.published_at.slice(0, 10) : 'Unknown Date'}</p>
        <p>{apiData?.name ? apiData.name : 'Unknown Name'}</p>
        <p>{apiData?.type ? apiData.type : 'Unknown Type'}</p>
      </div>
    </div> : 
    <h1 className='error-display'> Oops!.. Movie Details Not Available <br/> Go back to Home Page </h1>
  )
}

export default Player