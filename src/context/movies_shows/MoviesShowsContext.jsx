/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const MoviesShowsContext = createContext()

const MOVIES_URL = import.meta.env.VITE_MOVIES_URL;
const IPINFO_URL = import.meta.env.VITE_IPINFO_URL;
const MOVIES_TOKEN = import.meta.env.VITE_MOVIES_TOKEN;
const IPINFO_TOKEN = import.meta.env.VITE_IPINFO_TOKEN;

export const MoviesShowsProvider = ({ children }) => {

    const [popularMovies, setPopularMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [topRatedTVShows, setTopRatedTVShows] = useState([])
    const [popularTVShows, setPopularTVShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [movieDetails, setMovieDetails] = useState({})
    const [movieDetailsProviders, setMovieDetailsProviders] = useState({})
    const [movieDetailsCredits, setMovieDetailsCredits] = useState({})
    const [movieDetailsSocials, setMovieDetailsSocials] = useState({})
    const [tvDetails, setTVDetails] = useState({})
    const [tvDetailsProviders, setTVDetailsProviders] = useState({})
    const [tvDetailsCredits, setTVDetailsCredits] = useState({})
    const [tvDetailsSocials, setTVDetailsSocials] = useState({})
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [country, setCountry] = useState({})
    const [youtubeTrailer, setYoutubeTrailer] = useState({})

    // Now Playing Movies

    const fetchNowPlayingMovies = async () => {

        //const resultsPerPage = 12;

        // Construct query parameters
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/movie/top_rated?${params}`);

        if (response.ok) {
            const { results } = await response.json();
            setLoading(false)
            setNowPlayingMovies(results);

        } else {

            console.error('Failed to fetch popular movies.');

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
            setLoading(false)

        } else {
            // Handle error
            console.error('Failed to fetch popular movies.');

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
            setLoading(false)
            setTopRatedMovies(results);

        } else {
            // Handle error
            console.error('Failed to fetch popular movies.');

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

        const response = await fetch(`${MOVIES_URL}/trending/tv/week?${params}`);

        if (response.ok) {
            const { results } = await response.json();
            const latestPopularTVShows = results.slice(0, resultsPerPage);
            setLoading(false)
            setPopularTVShows(latestPopularTVShows);

        } else {
            // Handle error
            console.error('Failed to fetch popular movies.');

        }
    }

    //Top Rated TV Shows

    const fetchTopRatedTVShows = async () => {

        // const resultsPerPage = 20;

        // Construct query parameters
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/tv/top_rated?${params}`);

        if (response.ok) {
            const { results } = await response.json();
            setLoading(false)
            setTopRatedTVShows(results);

        } else {
            // Handle error
            console.error('Failed to fetch popular movies.');

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
            // console.log(data)
            setLoading(false)
            setMovieDetails(data);

        } else {
            window.location = '/notfound';

        }
    }

    //Movie Details - Providers

    const fetchMovieDetailsProviders = async (id) => {
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/movie/${id}/watch/providers?${params}`);

        if (response.ok) {

            const data = await response.json();
            console.log(data)
            setLoading(false)
            setMovieDetailsProviders(data);

        } else {
            window.location = '/notfound';

        }
    }

    //Movie Details - Credits


    const fetchMovieDetailsCredits = async (id) => {
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/movie/${id}/credits?${params}`);

        if (response.ok) {

            const data = await response.json();
            // console.log(data)
            setLoading(false)
            setMovieDetailsCredits(data);

        } else {
            window.location = '/notfound';

        }
    }

    //Movie Details - Videos

    const fetchTrailers = async (id) => {

        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/movie/${id}/videos?${params}`);

        if (response.ok) {

            const data = await response.json();

            // console.log(data)
            setYoutubeTrailer(data)
            setLoading(false)
        }
    }

    //Movie Details - Social Media

    const fetchMovieDetailsSocials = async (id) => {

        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/movie/${id}/external_ids?${params}`);

        if (response.ok) {

            const data = await response.json();

            // console.log(data)
            setMovieDetailsSocials(data)
            setLoading(false)
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
            setLoading(false)
            // console.log(data)
            setTVDetails(data);

        } else {
            window.location = '/notfound';

        }
    }

    //TV Details - Providers

    const fetchTVDetailsProviders = async (id) => {
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/tv/${id}/watch/providers?${params}`);

        if (response.ok) {

            const data = await response.json();
            console.log(data)
            setLoading(false)
            setTVDetailsProviders(data);

        } else {
            window.location = '/notfound';

        }
    }

    //Movie Details - Credits


    const fetchTVDetailsCredits = async (id) => {
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/tv/${id}/credits?${params}`);

        if (response.ok) {

            const data = await response.json();
            // console.log(data)
            setLoading(false)
            setTVDetailsCredits(data);

        } else {
            window.location = '/notfound';

        }
    }

    //Movie Details - Social Media

    const fetchTVDetailsSocials = async (id) => {

        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/tv/${id}/external_ids?${params}`);

        if (response.ok) {

            const data = await response.json();

            // console.log(data)
            setTVDetailsSocials(data)
            setLoading(false)
        }
    }

    //IP INFO Request

    const fetchCountry = async () => {
        const api_key = IPINFO_TOKEN;

        const response = await fetch(`${IPINFO_URL}?token=${api_key}`);

        if (response.ok) {

            const data = await response.json();
            // console.log(data)
            setCountry(data)
            setLoading(false)
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
        topRatedTVShows,
        movieDetailsProviders,
        country,
        youtubeTrailer,
        movieDetailsCredits,
        movieDetailsSocials,
        tvDetailsProviders,
        tvDetailsCredits,
        tvDetailsSocials,
        setLoading,
        fetchPopularMovies,
        fetchPopularTVShows,
        fetchMovieDetails,
        fetchNowPlayingMovies,
        fetchTVDetails,
        fetchTopRatedMovies,
        fetchTopRatedTVShows,
        fetchMovieDetailsProviders,
        fetchCountry,
        fetchTrailers,
        fetchMovieDetailsCredits,
        fetchMovieDetailsSocials,
        fetchTVDetailsProviders,
        fetchTVDetailsCredits,
        fetchTVDetailsSocials
    }}>
        {children}
    </MoviesShowsContext.Provider>
}

export default MoviesShowsContext

