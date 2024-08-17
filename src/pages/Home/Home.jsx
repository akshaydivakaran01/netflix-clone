import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import play_icon from '../../assets/play_icon.png';
import info_icon  from '../../assets/info_icon.png';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';
import TopTenList from '../../components/TopTenList/TopTenList';
import Footer from '../../components/Footer/Footer';
import { imageUrl, Data_List, getData, getTruncatedText } from '../../constants';
import UserFavourites from '../../components/UserFavoutites/UserFavourites';
import { useAppContext } from '../../context/appContext';

const Home = () => {

  const [apiData, setApiData] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  const {isDisplayFavorites} = useAppContext();

  const moviesRef = useRef(null);
  const tvShowsRef = useRef(null);
  const popularRef = useRef(null);
  
  useEffect( () => {
    getData(Data_List.now_playing_movies)
    .then(response => setApiData(response.results[Math.floor(Math.random()*response.results.length)]))
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    window.scrollTo(0, 0);

  }, [])

  const sectionRefs = {
    movies: moviesRef,
    tvShows: tvShowsRef,
    popular: popularRef
  };

  const scrollToSection = (section) => {
    const sectionRef = sectionRefs[section];
    if (sectionRef && sectionRef.current) {
      const offsetTop = sectionRef.current.offsetTop;
      window.scrollTo({
        top: offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className='home'>

      < Navbar scrollToSection={scrollToSection}/>

      { isDisplayFavorites ? <UserFavourites/> 
      
      :

      <>
        <div className="hero">
          <img src={apiData? imageUrl + apiData.backdrop_path: ''} 
            className='banner-img' 
            alt="Banner" />
          <div className="hero-caption">
            <h1 className='title'> {apiData? apiData.title || apiData.name: ''} </h1>
            <p>
              {isExpanded ? apiData?.overview : getTruncatedText(apiData?.overview, 300)}
              {apiData?.overview?.length > 300 && (
                <span className='desc-expand' onClick={() => {setIsExpanded(!isExpanded);}}>
                  {isExpanded ? 'Read less' : '...Read more'}
                </span>
              )}
            </p>
            <div className="hero-btns">
                <button type='button' 
                        className='btn'
                        onClick={()=>{ navigate(`/player/${apiData.id}`);}}>
                  <img src={play_icon} 
                      alt="play-icon" />Play</button>
                <button type='button' 
                        className='btn dark-btn'
                        onClick={() => {window.location.href = `https://www.themoviedb.org/movie/${apiData.id}-${apiData.original_title}`;}}>
                  <img src={info_icon} 
                      alt="info-icon" />More Info</button>
            </div>
            <div ref={popularRef}>
            < TitleCards endpoint = {Data_List.popular_movies}/>
            </div>           
          </div>
        </div>

        <div className="more-cards">
          <div ref={moviesRef}>
          < TopTenList title = {"Top 10 Movies in India Today"} endpoint={Data_List.top_ten_movies} />
          </div>
          < TitleCards title = {"Today's Top Picks for You"} endpoint = {Data_List.thriller_movies} />
          < TitleCards title = {"Blockbuster Movies"} endpoint = {Data_List.top_rated_movies} />
          < TitleCards title = {"Anime"} endpoint = {Data_List.anime_movies} />
          <div ref={tvShowsRef}>
          < TopTenList title = {"Top 10 TV Shows in India Today"} endpoint={Data_List.top_ten_tvshows} />
          </div>
          < TitleCards title = {"Comedy Movies"} endpoint = {Data_List.comedy_movies} />
          < TitleCards title = {"Exciting Epics"} endpoint = {Data_List.history_movies} />
          < TitleCards title = {"Only on Netflix"} endpoint = {Data_List.netflix_shows} />
          < TitleCards title = {"Upcoming"} endpoint = {Data_List.upcoming_movies} />
          < TitleCards title = {"Thrillers & Horror Movies"} endpoint = {Data_List.horror_movies} />
        </div>
      </>
      }
        < Footer />
    </div>
  )
}

export default Home