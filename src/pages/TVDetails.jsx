import { useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import MoviesShowsContext from "../context/movies_shows/MoviesShowsContext";
import Spinner from "../components/layout/Spinner";
import { AiFillStar } from 'react-icons/ai'

const TVDetails = () => {

    const { tvDetails, fetchTVDetails, loading } = useContext(MoviesShowsContext)

    const params = useParams()

    useEffect(() => {
        fetchTVDetails(params.id)
    }, [])

    if (!loading) {
        return (
            <>
                <div>
                    <img className="bg-image w-full h-auto lg:w-screen xl:h-screen" key={tvDetails.id} src={`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`} alt="Album" />
                    <div className="flex justify-center mt-10">
                        <div className="h-full w-full md:w-10/12">
                            <div className="flex justify-center md:justify-start">
                                <Link to='/'><button className="btn btn-outline">Back to home</button></Link>
                            </div>
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 mt-5">
                                    {tvDetails.poster_path ? (
                                        <img src={`https://image.tmdb.org/t/p/w400${tvDetails.poster_path}`} alt="Album" className="w-full h-auto" />
                                    ) : (
                                        <img src="/src/images/no-image.jpg" alt="Album" />
                                    )}
                                </div>
                                <div className="w-3/4 md:w-3/5 lg:w-2/3 xl:w-3/4 mt-5 flex flex-col gap-5 md:ml-10 align-mid">
                                    <div className="flex flex-col justify-center items-center text-center">
                                        <h1 className="font-bold text-3xl text-white">{tvDetails.name?.toUpperCase()}</h1>
                                        <h1>{tvDetails.tagline}</h1>
                                    </div>
                                    <div className="flex items-center">
                                        <AiFillStar className="text-yellow-300 mr-2" />
                                        <h1>{tvDetails.vote_average?.toFixed(1)}/10</h1>
                                    </div>
                                    <div>
                                        <h1><span className="font-bold text-white">Release Date:</span> {tvDetails.first_air_date}</h1>
                                        <h1><span className="font-bold text-white">Last Air Date:</span> {tvDetails.last_air_date}</h1>
                                    </div>
                                    <div>
                                        <h1 className="text-justify"> {tvDetails.overview}</h1>
                                    </div>
                                    <div className="">
                                        <h1 className="font-bold text-white">Genres</h1>
                                        {tvDetails.genres?.map((genre) => (
                                            <h1 key={genre.id}>{genre.name}</h1>
                                        ))}
                                    </div>
                                    <div>
                                        <a href={tvDetails.homepage} target="_blank" rel="noreferrer"><button className="btn btn-outline">Visit Movie Homepage</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-10 mb-10">
                        <div className="h-full w-10/12">
                            <div className="flex justify-center">
                                <h1 className="font-bold text-xl text-white">TV SHOW INFO   </h1>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h1><span className="font-bold text-white">Number Of Episodes: </span>{tvDetails.number_of_episodes}</h1>
                                <hr></hr>
                                <h1><span className="font-bold text-white">Number Of Seasons: </span>{tvDetails.number_of_seasons}</h1>
                                <hr></hr>
                                <h1><span className="font-bold text-white">Status: </span>{tvDetails.status}</h1>
                                <hr></hr>
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-white">Created By: </h1>
                                    <div className="flex">
                                        {tvDetails.created_by?.map((person, index) => (
                                            <div key={person.id} className="flex flex-row">
                                                <h1>{person.name}{index < tvDetails.production_companies.length - 1 ? ',\u00A0' : ''}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return <Spinner />
    }
}

export default TVDetails
