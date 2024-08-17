import axios from 'axios';

export const imageUrl = 'https://image.tmdb.org/t/p/original'

export const Data_List = {now_playing_movies: "movie/now_playing?language=en-US&page=1",
                          popular_movies: "movie/popular?language=en-US&page=1",
                          top_rated_movies: "movie/top_rated?language=en-US&page=1",
                          upcoming_movies: "movie/upcoming?language=en-US&page=2",
                          top_ten_movies: "trending/movie/day?language=en-US",
                          top_ten_tvshows: "trending/tv/day?language=en-US",
                          comedy_movies: "discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=35",
                          anime_movies: "discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=16",
                          thriller_movies: "discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=53",
                          history_movies: "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=36",
                          horror_movies: "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27",
                          netflix_shows: "discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_networks=213"
                        }

const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN

export const getData = (endpoint) => {
    const options = { 
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + TMDB_ACCESS_TOKEN
        }
      }

    return (axios.get('https://api.themoviedb.org/3/' + endpoint, options)
    .then(response => response.data)
    .catch(err => console.error(err)));
}

export const getTruncatedText = (text, length) => {
  if (!text) return '';
  if (text.length <= length) return text;
  const truncated = text.substring(0, length);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  return lastSpaceIndex === -1 ? truncated : truncated.substring(0, lastSpaceIndex);
};