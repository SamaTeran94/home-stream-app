import { useEffect, useContext } from "react"
import Spinner from "../components/layout/Spinner.jsx"
import MoviesShowsContext from "../context/movies_shows/MoviesShowsContext";
import CardItemTRMovies from "../components/CardItemTRMovies";

const Movies = () => {

    const { topRatedMovies, fetchTopRatedMovies, loading } = useContext(MoviesShowsContext)

    useEffect(() => {
        fetchTopRatedMovies()
    }, [])

    if (!loading) {
        return (
            <div className="flex flex-col h-full gap-20 pb-10 pt-10">
                <div className="flex flex-col gap-5">
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-full px-5">
                            <div className="flex justify-center mb-5">
                                <h1 className="font-bold text-white text-3xl">Top Rated Movies</h1>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 px-4 gap-5">
                                <CardItemTRMovies topRatedMovies={topRatedMovies} />
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        )
    } else {
        return <Spinner />
    }
}

export default Movies
