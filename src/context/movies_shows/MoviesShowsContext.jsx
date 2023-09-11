/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const MoviesShowsContext = createContext()

const MOVIES_URL = import.meta.env.VITE_MOVIES_URL;
const MOVIES_TOKEN = import.meta.env.VITE_MOVIES_TOKEN;

export const MoviesShowsProvider = ({ children }) => {

    const [popularMovies, setPopularMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [popularTVShows, setPopularTVShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [movieDetails, setMovieDetails] = useState({})
    const [tvDetails, setTVDetails] = useState({})
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])

    // Now Playing Movies

    const fetchNowPlayingMovies = async () => {

        //const resultsPerPage = 12;

        // Construct query parameters
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/movie/now_playing?${params}`);

        if (response.ok) {
            const { results } = await response.json();

            setNowPlayingMovies(results);
            setLoading(false);
        } else {

            console.error('Failed to fetch popular movies.');
            setLoading(false);
        }
    }

    //Popular Movies

    const fetchPopularMovies = async () => {

        const resultsPerPage = 21;

        // Construct query parameters
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/movie/popular?${params}`);

        if (response.ok) {
            const { results } = await response.json();
            const latestPopularMovies = results.slice(0, resultsPerPage);
            setPopularMovies(latestPopularMovies);
            setLoading(false);
        } else {
            // Handle error
            console.error('Failed to fetch popular movies.');
            setLoading(false);
        }
    }

    //Top Rated Movies

    const fetchTopRatedMovies = async () => {

        // const resultsPerPage = 20;

        // Construct query parameters
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/movie/top_rated?${params}`);

        if (response.ok) {
            const { results } = await response.json();
            setTopRatedMovies(results);
            setLoading(false);
        } else {
            // Handle error
            console.error('Failed to fetch popular movies.');
            setLoading(false);
        }
    }


    //Popular TV Shows

    const fetchPopularTVShows = async () => {

        const resultsPerPage = 20;

        // Construct query parameters
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/tv/popular?${params}`);

        if (response.ok) {
            const { results } = await response.json();
            const latestPopularTVShows = results.slice(0, resultsPerPage);
            setPopularTVShows(latestPopularTVShows);
            setLoading(false);
        } else {
            // Handle error
            console.error('Failed to fetch popular movies.');
            setLoading(false);
        }
    }

    //Movie Details

    const fetchMovieDetails = async (id) => {
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/movie/${id}?${params}`);

        if (response.ok) {

            const data = await response.json();
            setMovieDetails(data);
            setLoading(false);
        } else {
            window.location = '/notfound';
            setLoading(false);
        }
    }

    //TV Details

    const fetchTVDetails = async (id) => {
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/tv/${id}?${params}`);

        if (response.ok) {

            const data = await response.json();
            setTVDetails(data);
            setLoading(false);
        } else {
            window.location = '/notfound';
            setLoading(false);
        }
    }

    return <MoviesShowsContext.Provider value={{
        popularMovies,
        popularTVShows,
        loading,
        movieDetails,
        nowPlayingMovies,
        tvDetails,
        topRatedMovies,
        fetchPopularMovies,
        fetchPopularTVShows,
        fetchMovieDetails,
        fetchNowPlayingMovies,
        fetchTVDetails,
        fetchTopRatedMovies
    }}>
        {children}
    </MoviesShowsContext.Provider>
}

export default MoviesShowsContext

