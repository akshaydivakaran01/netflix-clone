import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { getData } from '../../constants';
import right_arrow from '../../assets/right_arrow.png';
import left_arrow from '../../assets/left_arrow.png';
import CardPopup from '../CardPopup/CardPopup';

const TitleCards = ({title, endpoint}) => {

  const [apiData, setApiData] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [popupStyle, setPopupStyle] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [popupTimeout, setPopupTimeout] = useState(null);

  const listRef = useRef(null);

  const scrollLeft = () => {
    listRef.current.scrollBy({
      top: 0,
      left: -500,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    listRef.current.scrollBy({
      top: 0,
      left: 500,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (listRef.current.scrollLeft > 0) {
      setShowLeftArrow(true);
    } else {
      setShowLeftArrow(false);
    }
  };

  const handleMouseEnter = (e, index) => {
    const timeoutId = setTimeout(() => {
      const rect = e.target.getBoundingClientRect();
      setHoveredCard(index);
      setPopupStyle({
        top: `${rect.top - 50}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: 'translateX(-50%) scale(0.8)',
        transition: 'transform 0.3s ease-in-out',
      });
    }, 400);
    setPopupTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    clearTimeout(popupTimeout);
    setHoveredCard(null);
    if(isExpanded){
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    getData(endpoint)
    .then(response => setApiData(response.results))
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    const handleWindowScroll = () => {
      setHoveredCard(null);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title? title: 'Popular on Netflix'}</h2>
      { showLeftArrow && 
      (<button 
        className="arrow left-arrow" 
        onClick={scrollLeft}>
        <img 
          src={left_arrow} 
          alt="Left Arrow" />
      </button>) }
      <div 
        className="card-list" 
        ref={listRef} 
        onScroll={handleScroll}>
        {apiData.map((card, index) => {
          return (
            <div 
              className="card-wrapper"
              key={index}
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseLeave={handleMouseLeave}>
              <div
                className="card" 
                key={index}>
                  <img src={`https://image.tmdb.org/t/p/w500` + card.poster_path} alt="Poster" />
              </div>

              { hoveredCard === index && <CardPopup  
                card={card} 
                isExpanded={isExpanded} 
                setIsExpanded={setIsExpanded} 
                popupStyle={popupStyle}/> }
            </div>
          )
          }
        )}
      </div>
      <button className="arrow right-arrow" onClick={scrollRight}>
        <img src={right_arrow} alt="Right Arrow" />
      </button>
    </div>
  )
}

export default TitleCards