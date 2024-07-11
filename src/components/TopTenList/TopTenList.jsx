import React, { useState, useEffect } from 'react'
import './TopTenList.css'
import { Link } from 'react-router-dom'
import { getData } from '../../constants'


const TopTenList = ({title, endpoint}) => {

    const [apiData, setApiData] = useState([])
    
    useEffect(() =>{
    
        getData(endpoint)
        .then(response => setApiData(response.results))
        .catch(error => {
        console.error('Error fetching data:', error);
    });
    
    }, [])

  return (
    <div className='top10-container'>
        <h2 className='top10-title'>{title}</h2>
        <div className="top10-card-list">
            {apiData.map((card, index) => {
                return (
                    index <= 9?
                    <Link to={`/player/${card.id}`} className="top10-card" key={index}>
                        <div className="top10-rank"><p>{index + 1}</p></div>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.poster_path} alt="Poster" className="top10-image" />
                    </Link> : ''
                )
            })}
        </div>
    </div>
  )
}

export default TopTenList