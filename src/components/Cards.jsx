import { useEffect, useContext } from "react"
import Spinner from "./layout/Spinner";
import MoviesShowsContext from "../context/movies_shows/MoviesShowsContext";
import CardItemMovies from "./CardItemMovies"
import CardItemTV from "./CardItemTV";

const Cards = () => {

    const { popularMovies, popularTVShows, loading, fetchPopularMovies, fetchPopularTVShows } = useContext(MoviesShowsContext)

    useEffect(() => {
        fetchPopularMovies()
        fetchPopularTVShows()
    }, [])


    if (!loading) {
        return (
            <>
                <div className="flex flex-col gap-5">
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-full px-5">
                            <div className="flex justify-center mb-5">
                                <h1 className="font-bold text-white text-3xl">Popular Movies</h1>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 px-4 gap-5">
                                <CardItemMovies popularMovies={popularMovies} />
                            </div>
                        </div>
                        <div className="w-full px-5 mt-10">
                            <div className="flex justify-center mb-5">
                                <h1 className="font-bold text-white text-3xl">Popular TV Shows</h1>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 px-4 gap-5">
                                <CardItemTV popularTVShows={popularTVShows} />
                            </div>
                        </div>
                    </div>
                </div >
            </>
        )
    } else {
        return <Spinner />
    }
}

export default Cards
