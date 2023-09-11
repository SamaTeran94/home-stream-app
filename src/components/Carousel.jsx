import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import MoviesShowsContext from "../context/movies_shows/MoviesShowsContext";

const Carousel = () => {

    const { nowPlayingMovies, fetchNowPlayingMovies, } = useContext(MoviesShowsContext)

    useEffect(() => {
        fetchNowPlayingMovies()
    }, [])

    return (
        <div className="h-96 flex">
            <div className="carousel rounded-box">
                <div className="carousel-item">
                    {nowPlayingMovies.map(({ id, poster_path }) => (
                        <div key={id}>
                            <Link to={`/movie_details/${id}`}><img className="h-96 w-full cursor-pointer hover:opacity-80 hover:translate-y-2" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Album" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel
