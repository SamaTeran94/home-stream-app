import { useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import MoviesShowsContext from "../context/movies_shows/MoviesShowsContext";
import Spinner from "../components/layout/Spinner";
import { AiFillStar } from 'react-icons/ai'
import { FaFacebook, FaInstagram, FaSquareTwitter, FaWikipediaW } from 'react-icons/fa6'

//Cast Carousel

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MovieDetails = () => {

    const { movieDetails, fetchMovieDetails, loading, movieDetailsProviders, fetchMovieDetailsProviders, fetchCountry, country, fetchTrailers, youtubeTrailer, fetchMovieDetailsCredits, movieDetailsCredits, movieDetailsSocials, fetchMovieDetailsSocials } = useContext(MoviesShowsContext)

    const params = useParams()

    //Youtube Trailer

    let YTTrailerKey = ""; // Initialize the key as an empty string

    if (youtubeTrailer?.results) {
        // Check if youtubeTrailer.results is defined
        for (const video of youtubeTrailer.results) {
            if (video.name === 'Official Trailer' || video.name === 'Main Trailer' || video.name.includes('Trailer')) {
                YTTrailerKey = video.key; // Set the key to the video's key
                break; // Exit the loop since we found the video
            } else {
                YTTrailerKey = null
            }
        }
    }

    let videoUrl = `https://www.youtube.com/embed/${YTTrailerKey}`;

    //Region For Providers

    let region = "";
    if (country.country) {
        region = country.country
    }

    const regionDataBuy = movieDetailsProviders.results?.[region]?.buy
    const regionDataRent = movieDetailsProviders.results?.[region]?.rent
    const regionDataFlatrate = movieDetailsProviders.results?.[region]?.flatrate

    //Use Effect

    useEffect(() => {
        fetchMovieDetails(params.id)
        fetchMovieDetailsProviders(params.id)
        fetchCountry()
        fetchTrailers(params.id)
        fetchMovieDetailsCredits(params.id)
        fetchMovieDetailsSocials(params.id)
    }, [])

    if (!loading) {
        return (
            <>
                <div>
                    <img className="bg-image w-full h-auto lg:w-screen xl:h-screen" key={movieDetails.id} src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} alt="Album" />
                    <div className="flex justify-center mt-10">
                        <div className="h-full w-11/12">
                            <div className="gap-2 flex">
                                <Link to='/'><button className="btn btn-outline">Home</button></Link>
                                <div>
                                    <button className="btn btn-outline" onClick={() => document.getElementById('my_modal_2').showModal()}>Trailer</button>
                                    <dialog id="my_modal_2" className="modal">
                                        <div className="modal-box">
                                            <div className="iframe-container">
                                                {YTTrailerKey !== null ?
                                                    <iframe
                                                        width="100%"    /* Set the iframe width to 100% */
                                                        height="0"      /* Set the initial height to 0 */
                                                        src={videoUrl}
                                                        frameBorder="0"
                                                        allowFullScreen
                                                        allow="autoplay; encrypted-media"
                                                        onLoad={(e) => {
                                                            // Calculate and set the iframe's height based on its width and aspect ratio
                                                            const iframe = e.target;
                                                            const aspectRatio = 9 / 16; // 16:9 aspect ratio
                                                            const width = iframe.clientWidth;
                                                            iframe.style.height = `${width * aspectRatio}px`;
                                                        }}
                                                    ></iframe>
                                                    : <h1>No data available</h1>
                                                }
                                            </div>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button onClick={() => document.getElementById('my_modal_2').close()}>Close</button>
                                        </form>
                                    </dialog>
                                </div>
                                <a href={`https://movie-web.app/media/tmdb-movie-${params.id}`} target="_blank" rel="noreferrer" className="btn btn-outline">Stream Online</a>
                            </div>
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 mt-5">
                                    {movieDetails.poster_path ? (
                                        <img src={`https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`} alt="Album" className="w-full h-auto" />
                                    ) : (
                                        <img src="/src/images/no-image.jpg" alt="Album" />
                                    )}
                                </div>
                                <div className="w-full md:w-3/5 lg:w-2/3 xl:w-3/4 mt-5 flex flex-col gap-5 md:ml-10 align-mid">
                                    <div className="flex flex-col justify-center items-center text-center">
                                        <h1 className="font-bold text-3xl text-white">{movieDetails.title?.toUpperCase()} ({movieDetails.release_date?.split('-')[0]})</h1>
                                        <h1>{movieDetails.tagline}</h1>
                                    </div>
                                    <div className="flex items-center">
                                        <AiFillStar className="text-yellow-300 mr-2" />
                                        <h1>{movieDetails.vote_average?.toFixed(1)}/10</h1>
                                    </div>
                                    <div>
                                        <h1><span className="font-bold text-white">Release Date:</span> {movieDetails.release_date}</h1>
                                    </div>
                                    <div>
                                        <h1 className="text-justify"> {movieDetails.overview}</h1>
                                    </div>

                                    <div className="flex flex-row md:flex-row justify-between">
                                        <div>
                                            <h1 className="font-bold text-white pb-2">Genres</h1>
                                            {movieDetails.genres?.map((genre) => (
                                                <h1 key={genre.id}>{genre.name}</h1>
                                            ))}
                                        </div>
                                        <div className="flex flex-col lg:flex-row gap-5 lg:gap-0">
                                            <div>
                                                <h1 className="font-bold text-white pb-2">Where To Watch</h1>
                                                {!regionDataBuy && !regionDataRent && !regionDataFlatrate ?
                                                    <h1>No Data Available</h1> :
                                                    <div className={!regionDataBuy && !regionDataRent ? `flex flex-col gap-0` : `flex flex-col gap-5`}>
                                                        <div className="flex gap-2">
                                                            {!regionDataBuy ? null : (
                                                                <div className="flex gap-3">
                                                                    <h1 className="">Buy</h1>
                                                                    {regionDataBuy.map((provider) => (
                                                                        <img
                                                                            src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                                                                            key={provider.id}
                                                                            alt={`${provider.provider_id} logo`}
                                                                            style={{ width: '40px', height: 'auto', borderRadius: '5px' }}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {!regionDataRent ? null : (
                                                                <div className="flex gap-3">
                                                                    <h1 className="">Rent</h1>
                                                                    {regionDataRent.map((provider) => (
                                                                        <img
                                                                            src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                                                                            key={provider.id}
                                                                            alt={`${provider.provider_id} logo`}
                                                                            style={{ width: '40px', height: 'auto', borderRadius: '5px' }}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="">
                                                            {!regionDataFlatrate ? null : (
                                                                <div className="flex gap-3">
                                                                    <h1 className="">Stream</h1>
                                                                    <div className="w-32 sm:w-full flex flex-wrap gap-3">
                                                                        {regionDataFlatrate.map((provider) => (
                                                                            <img key={provider.id}
                                                                                src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                                                                                alt={`${provider.provider_id} logo`}
                                                                                style={{ width: '40px', height: 'auto', borderRadius: '5px' }}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="mt-5 xl:mt-20 mb-3">
                                    <h1 className="font-bold text-3xl">Cast</h1>
                                </div>
                                <div className="w-full flex">
                                    <div className='w-7/12 sm:w-9/12 md:10/12 p-3 mb-10 bg-white'>
                                        <Swiper
                                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                                            spaceBetween={20}
                                            // slidesPerView={6}
                                            navigation
                                            // pagination={{ clickable: true }}
                                            scrollbar={{ draggable: true }}
                                            breakpoints={{
                                                1536: {
                                                    slidesPerView: 6,
                                                },
                                                1280: {
                                                    slidesPerView: 6,

                                                },

                                                1024: {
                                                    slidesPerView: 4,

                                                },
                                                768: {
                                                    slidesPerView: 3,

                                                },
                                                640: {
                                                    slidesPerView: 2,
                                                }
                                            }}>
                                            {movieDetailsCredits?.cast?.map(({ cast_id, profile_path, name, character }) => (
                                                profile_path ? (
                                                    <SwiperSlide className="bg-white" key={cast_id}>
                                                        <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt="Album" />
                                                        <div className="shadow-md p-3">
                                                            <h1 className="font-bold text-black">{name}</h1>
                                                            <h1>{character}</h1>
                                                        </div>
                                                    </SwiperSlide>
                                                ) : <SwiperSlide className="bg-white rounded-xl" key={cast_id}>
                                                    <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt="No Image available" />
                                                    <div className="shadow-md p-3">
                                                        <h1 className="font-bold text-black">{name}</h1>
                                                        <h1>{character}</h1>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                    <div className="w-5/12 flex justify-center mt-10 mb-10">
                                        <div className="h-full w-10/12">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex gap-2">
                                                    <a target='_blank' rel="noreferrer" href={`https://www.facebook.com/${movieDetailsSocials?.facebook_id}`}><FaFacebook style={{ width: '25px', height: '25px' }} /></a>
                                                    <a target='_blank' rel="noreferrer" href={`https://www.instagram.com/${movieDetailsSocials?.instagram_id}`}>< FaInstagram style={{ width: '25px', height: '25px' }} /></a>
                                                    <a target='_blank' rel="noreferrer" href={`https://www.twitter.com/${movieDetailsSocials?.twitter_id}`}><FaSquareTwitter style={{ width: '25px', height: '25px' }} /></a>
                                                    <a target='_blank' rel="noreferrer" href={`https://www.wikidata.org/wiki/${movieDetailsSocials?.wikidata_id}`}><FaWikipediaW style={{ width: '25px', height: '25px' }} /></a>
                                                </div>
                                                <div>
                                                    <span className="font-bold text-white">
                                                        Budget:</span> {!movieDetails.budget ? (
                                                            <span>No data available</span>
                                                        ) : (
                                                            `$${movieDetails.budget?.toLocaleString()}`
                                                        )}
                                                </div>
                                                <hr></hr>
                                                <div>
                                                    <span className="font-bold text-white">
                                                        Budget:</span> {!movieDetails.revenue ? (
                                                            <span>No data available</span>
                                                        ) : (
                                                            `$${movieDetails.budget?.toLocaleString()}`
                                                        )}
                                                </div>
                                                <hr></hr>
                                                <h1><span className="font-bold text-white">Runtime:</span> {`${movieDetails.runtime} min`}</h1>
                                                <hr></hr>
                                                <h1><span className="font-bold text-white">Status: </span>{movieDetails.status}</h1>
                                                <hr></hr>
                                                <div>
                                                    {movieDetails.homepage ? (<a href={movieDetails.homepage} target='_blank' rel="noreferrer" ><button className='btn btn-outline'>Official Webpage</button></a>) : null
                                                    }
                                                </div>
                                                <div className="flex flex-col">
                                                    {/*<h1 className="font-bold text-white">Production Companies</h1>
                                                <div className="flex">
                                                    {movieDetails.production_companies?.map((company, index) => (
                                                        <div key={company.id} className="flex flex-row">
                                                            <h1>{company.name}{index < movieDetails.production_companies.length - 1 ? ',\u00A0' : ''}</h1>
                                                        </div>
                                                    ))}
                                                    </div>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default MovieDetails
