import { useEffect, useState } from "react"
import Spinner from "./layout/Spinner";
import { Link } from "react-router-dom";

const CardItem = () => {

    const [popularMovies, setPopularMovies] = useState([])
    const [popularTVShows, setPopularTVShows] = useState([])
    const [loading, setLoading] = useState(true)


    const MOVIES_URL = import.meta.env.VITE_MOVIES_URL;
    const MOVIES_TOKEN = import.meta.env.VITE_MOVIES_TOKEN;

    useEffect(() => {
        fetchPopularMovies()
        fetchPopularTVShows()
    }, [])

    //Popular Movies

    const fetchPopularMovies = async () => {

        const resultsPerPage = 12;

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

    //Popular TV Shows

    const fetchPopularTVShows = async () => {

        const resultsPerPage = 12;

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


    if (!loading) {
        return (
            <>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-3/4">
                        <div className="flex justify-center mb-5">
                            <h1>Popular Movies</h1>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 px-4 gap-5">
                            {popularMovies.map((movie) => (
                                <div key={movie.id} className="relative bg-yellow-300 text-white font-bold rounded-lg shadow-md p-2 cursor-pointer hover:translate-y-2">
                                    <Link to={`/movie_details/${movie.id}`}>
                                        <div className="group">
                                            {movie.poster_path ? (
                                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Album" />
                                            ) : (
                                                <img src="/src/images/no-image.jpg" alt="Album" />
                                            )}
                                            {/* Year overlay */}
                                            <div className="text-xl text-white absolute top-1 left-1 bg-info p-2 rounded-lg pointer-events-none">
                                                {movie.release_date.substring(0, 4)}
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="flex justify-center text-center mt-2">
                                        <h2>{movie.original_title.substring(0, 4)}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-3/4 mt-10">
                        <div className="flex justify-center mb-5">
                            <h1>Popular TV Shows</h1>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 px-4 gap-5">
                            {popularTVShows.map((show) => (
                                <div key={show.id} className="relative bg-yellow-300 text-white font-bold rounded-lg shadow-md p-2 cursor-pointer hover:translate-y-2">
                                    {show.poster_path ? (
                                        <figure>
                                            <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt="Album" />
                                        </figure>
                                    ) : (
                                        <figure>
                                            <img src="/src/images/no-image.jpg" alt="Album" />
                                        </figure>
                                    )}
                                    <div className="text-center absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                        <span className="text-xl text-white absolute top-1 left-1 bg-info p-2 rounded-lg">{show.first_air_date.substring(0, 4)}</span>
                                    </div>
                                    <div className="flex justify-center text-center mt-2">
                                        <h2>{show.name}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </>
        )
    } else {
        return <Spinner />
    }



}

export default CardItem
