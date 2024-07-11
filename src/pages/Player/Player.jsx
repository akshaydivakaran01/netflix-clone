import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWU0YWE3ZmE1ZDdlZDhkYjdiODhmNjZlZDVlMTIwMCIsIm5iZiI6MTcyMDEwMTA1MC44MzIwOSwic3ViIjoiNjY4NmE0MzA4ZmFkMmU3MDM5NWVjMGFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ATdv8wwtJXo3czRwCMGsJXJS33f_izgdGrYctZ6PTCo'
    }
  };
  
  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
    
  }, [])
  
  return (
    apiData ?
    <div className='player'>
      <img src={back_arrow_icon} alt="Back_Arrow_icon" onClick={() =>{
        navigate(-2)
      }} />
      <iframe width="90%" height="90%" 
      src={`https://www.youtube.com/embed/${apiData.key ? apiData.key : ''}?autoplay=1`} allow="autoplay"
      title = "Trailer" allowFullScreen frameBorder='0'  ></iframe>
      
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : 'Unknown Date'}</p>
        <p>{apiData.name ? apiData.name : 'Unknown Name'}</p>
        <p>{apiData.type ? apiData.type : 'Unknown Type'}</p>
      </div>

    </div> : <h1 style={{display:"flex", width:"100%", height:"100vh" ,justifyContent:"center", alignItems:"center"}}>Movie Details Not Available. Go back to Home Page.</h1>
  )
}

export default Player