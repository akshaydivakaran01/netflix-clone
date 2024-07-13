import React, { useEffect, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'
import { getData } from '../../constants'

const TitleCards = ({title, endpoint}) => {

  const [apiData, setApiData] = useState([]);

  useEffect(() =>{

    getData(endpoint)
    .then(response => setApiData(response.results))
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title? title: 'Popular on Netflix'}</h2>
      <div className="card-list">
        {apiData.map((card, index) => {
          return(
            <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500` + card.poster_path} alt="Poster" />
            </Link>
          )
          }
        )}
      </div>
    </div>
  )
}

export default TitleCards