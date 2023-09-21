import { useEffect } from "react";
import { useContext } from "react";
import Cards from "../components/Cards"
import Carousel from "../components/Carousel"
import Search from "../components/Search"
import HomeContext from "../context/movies_shows/HomeContext";
import Spinner from "../components/layout/Spinner";
import MoviesShowsContext from "../context/movies_shows/MoviesShowsContext";

const Home = () => {

    const { loading, fetchNowPlayingMovies, fetchPopularMovies, fetchPopularTVShows, setLoading } = useContext(MoviesShowsContext)

    useEffect(() => {
        Promise.all([fetchNowPlayingMovies(), fetchPopularMovies(), fetchPopularTVShows()])
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    if (!loading) {
        return (
            <div className="flex flex-col h-full gap-20 pb-10">
                <Carousel />
                <Search />
                <Cards />
            </div>
        )
    } else {
        return <Spinner />
    }
}

export default Home
