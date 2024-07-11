import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import play_icon from '../../assets/play_icon.png'
import info_icon  from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import TopTenList from '../../components/TopTenList/TopTenList'
import Footer from '../../components/Footer/Footer'
import { imageUrl,Data_List, getData } from '../../constants'



const Home = () => {

  const [apiData, setApiData] = useState({})
  
  useEffect(() => {

    getData(Data_List.now_playing_movies)
    .then(response => setApiData(response.results[Math.floor(Math.random()*response.results.length)]))
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [])
  
  return (
    <div className='home'>

        < Navbar />

        <div className="hero">
            <img src={apiData? imageUrl + apiData.backdrop_path: ''} className='banner-img' alt="Banner" />
            <div className="hero-caption">
                <h1 className='title'>{apiData? apiData.title || apiData.name: ''}</h1>
                <p>{apiData.overview}.</p>
                <div className="hero-btns">
                    <button type='button' className='btn'><img src={play_icon} alt="" />Play</button>
                    <button type='button' className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
                </div>
                < TitleCards endpoint = {Data_List.popular_movies}/>            
            </div>
        </div>

        <div className="more-cards">
        < TopTenList title = {"Top 10 Movies in India Today"} endpoint={Data_List.top_ten_movies}/>
        < TitleCards title = {"Today's Top Picks for You"} endpoint = {Data_List.thriller_movies}/>
        < TitleCards title = {"Blockbuster Movies"} endpoint = {Data_List.top_rated_movies}/>
        < TitleCards title = {"Anime"} endpoint = {Data_List.anime_movies}/>
        < TopTenList title = {"Top 10 TV Shows in India Today"} endpoint={Data_List.top_ten_tvshows}/>
        < TitleCards title = {"Comedy Movies"} endpoint = {Data_List.comedy_movies}/>
        < TitleCards title = {"Exciting Epics"} endpoint = {Data_List.history_movies}/>
        < TitleCards title = {"Only on Netflix"} endpoint = {Data_List.netflix_shows}/>
        < TitleCards title = {"Upcoming"} endpoint = {Data_List.upcoming_movies}/>
        < TitleCards title = {"Thrillers & Horror Movies"} endpoint = {Data_List.horror_movies}/>

        </div>
        < Footer />
    </div>
  )
}

export default Home