import { createContext, useState } from "react";

const HomeContext = createContext()

const MOVIES_URL = import.meta.env.VITE_MOVIES_URL;
const MOVIES_TOKEN = import.meta.env.VITE_MOVIES_TOKEN;

// eslint-disable-next-line react/prop-types
export const HomeProvider = ({ children }) => {

    const [popularMovies, setPopularMovies] = useState([])
    const [popularTVShows, setPopularTVShows] = useState([])
    const [loadingHome, setLoadingHome] = useState(true)
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
            setLoadingHome(false)

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
            setLoadingHome(false)


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

        const response = await fetch(`${MOVIES_URL}/tv/popular?${params}`);

        if (response.ok) {
            const { results } = await response.json();
            const latestPopularTVShows = results.slice(0, resultsPerPage);
            setPopularTVShows(latestPopularTVShows);
            setLoadingHome(false)

        } else {
            // Handle error
            console.error('Failed to fetch popular movies.');

        }
    }

    return <HomeContext.Provider value={{
        nowPlayingMovies,
        popularMovies,
        popularTVShows,
        loadingHome,
        fetchNowPlayingMovies,
        fetchPopularMovies,
        fetchPopularTVShows,
        setLoadingHome
    }}>
        {children}
    </HomeContext.Provider>

}

export default HomeContext