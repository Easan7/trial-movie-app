import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard.tsx';
import Search from './components/Search.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import {useDebounce} from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 1000, [searchTerm]);


  const fetchMovies = async (query = '') => {
    setLoading(true);
    setErrorMessage('');
    try{
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  
  return (
    <main className="bg-[url('/bg.jpg')] bg-cover bg-center min-h-screen">
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src = "./frontpic.jpg" alt = "Movie Poster" />
          <h1>Discover <span className = "text-gradient">movies</span> that you will enjoy</h1>
          <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
        </header>

        <section className = "all-movies">
          <h2>All Movies</h2>
          {loading ? (<CircularProgress />) : errorMessage ? (<p className = "text-red-500">{errorMessage}</p>)
          : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key = {movie.id} movie={movie}/>
              ))}
            </ul>
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>


      </div>
    </main>
  )
}

export default App