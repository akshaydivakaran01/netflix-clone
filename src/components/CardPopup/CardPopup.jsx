import React, { useEffect, useState } from 'react';
import './CardPopup.css';
import { useNavigate } from 'react-router-dom';
import { getTruncatedText } from '../../constants';
import play_icon from '../../assets/play_icon.png';
import like_icon from '../../assets/like_icon.png';
import plus_icon from '../../assets/plus_icon.png';
import check_icon from '../../assets/check_icon.png';
import liked_icon from '../../assets/liked_icon.png';
import { AddToMyList , AddToLikes} from '../../firebase';
import { useAppContext } from '../../context/appContext';

const CardPopup = ({ card, isExpanded, setIsExpanded, popupStyle }) => { 

    const {myList, setMyList, likedList, setLikedList} = useAppContext();

    const navigate = useNavigate();
    
    const movie = {id: card.id ? card.id : '', 
        title: card.title ? card.title : '', 
        overview: card.overview ? card.overview : '', 
        poster_path: card.poster_path ? card.poster_path : ''};

    const [isLiked, setIsLiked] = useState(false);
    const [isAddedToMyList, setIsAddedToMyList] = useState(false);

    const addToMyList = (movie) => {
        setIsAddedToMyList(!isAddedToMyList);
        setMyList((prevMyList) => {
            const movieList = [...prevMyList, movie];
            return movieList.filter((movie, index, self) =>
                index === self.findIndex((m) => (
                  m.id === movie.id && m.title === movie.title
                )))
        });
    };

    const addToLikedList = (movie) => {
        setIsLiked(!isLiked);
        setLikedList((prevLikedList) => {
            const movieList = [...prevLikedList, movie];
            return movieList.filter((movie, index, self) =>
                index === self.findIndex((m) => (
                  m.id === movie.id && m.title === movie.title
                )))
        });
    };

    const removeFromMyList = (movie) => {
        setIsAddedToMyList(!isAddedToMyList);
        setMyList((prevMyList) => 
            prevMyList.filter(m => m.id !== movie.id && m.title !== movie.title)
        );
    };

    const removeFromLikedList = (movie) => {
        setIsLiked(!isLiked);
        setLikedList((prevLikedList) => 
            prevLikedList.filter(m => m.id !== movie.id && m.title !== movie.title)
        );
    };

    useEffect(() => {     
        myList?.forEach((movie) => {
            if (card.id === movie.id) {
                setIsAddedToMyList(true);
            }          
        })

        likedList?.forEach((movie) => {
            if (card.id === movie.id) {
                setIsLiked(true);
            }          
        })
    }, []);

    const handleUserFavourites = async () => {
        if(myList){
          AddToMyList(myList);
        }
        if(likedList)
        {
          AddToLikes(likedList);
        }
    };
    
    useEffect(() => {
        handleUserFavourites();
    }, [myList, likedList])
    

    return (
        <div className='popup' style={popupStyle}>
            <img className='popup-poster' src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="Poster" />
            <div className="popup-info">
                <h3>{card.title}</h3>
                <p>
                    { isExpanded ? card?.overview : getTruncatedText(card?.overview, 80) }
                    { card?.overview?.length > 80 && (
                        <span className='desc-expand' onClick={() => {setIsExpanded(!isExpanded) }}>
                        { isExpanded ? '  Read less' : '...Read more' }
                        </span>
                    )}
                </p>
                <div className="popup-buttons">
                    <button className='play-btn' 
                        onClick={() => {
                            navigate(`/player/${card.id}`)}}>
                        <img src={play_icon} alt="Play" title='Play'/>
                    </button>
                    
                    { isAddedToMyList ?
                    <button
                        alt="Add to My List" 
                        title='Remove from My List'
                        onClick={() => {
                            removeFromMyList(movie)}}>
                        <img src={check_icon}/>
                    </button> :
                    <button  
                        alt="Add to My List" 
                        title='Add to My List'
                        onClick={() => {
                            addToMyList(movie)}}> 
                        <img src={plus_icon} />
                    </button>
                    }

                    { isLiked ?
                    <button 
                        alt="Thumbs Up" 
                        title='Unlike'
                        onClick={() => {
                            removeFromLikedList(movie)}}>
                        <img src={liked_icon} />
                    </button> :
                    <button
                        alt="Thumbs Up" 
                        title='Like'
                        onClick={() => {
                            addToLikedList(movie)}
                        }>
                        <img src={like_icon} />
                    </button>
                    }
                </div>
            </div>
        </div>
        )
}

export default CardPopup