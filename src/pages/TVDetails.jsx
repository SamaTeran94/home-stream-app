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

const TVDetails = () => {

    const { tvDetails, fetchTVDetails, loading, tvDetailsProviders, fetchTVDetailsProviders, fetchCountry, country, fetchTVDetailsCredits, tvDetailsCredits, fetchTVDetailsSocials, tvDetailsSocials, fetchTVDetailsSeasons, tvDetailsSeasons, setTVDetailsSeasons, seasonNumber, setSeasonNumber } = useContext(MoviesShowsContext)

    const params = useParams()

    useEffect(() => {
        fetchTVDetails(params.id)
        fetchTVDetailsProviders(params.id)
        fetchTVDetailsCredits(params.id)
        fetchTVDetailsSocials(params.id)
        fetchTVDetailsSeasons(params.id)
        fetchCountry()
    }, [])


    const MOVIES_URL = import.meta.env.VITE_MOVIES_URL;
    const MOVIES_TOKEN = import.meta.env.VITE_MOVIES_TOKEN;
    let nextSeason = ""

    //Region For Providers

    let region = "";
    if (country.country) {
        region = country.country
    }

    const regionDataBuy = tvDetailsProviders.results?.[region]?.buy
    const regionDataRent = tvDetailsProviders.results?.[region]?.rent
    const regionDataFlatrate = tvDetailsProviders.results?.[region]?.flatrate

    //Next Button

    const handleNextSeason = async () => {

        nextSeason = seasonNumber + 1; // Store the updated page value

        setSeasonNumber(nextSeason); // Update the page state

        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/tv/${tvDetails.id}/season/${nextSeason}?${params}`);

        if (response.ok) {

            const data = await response.json();

            console.log(data)
            setTVDetailsSeasons(data)
        }
    }

    //Previous Button

    const handlePreviousSeason = async () => {

        nextSeason = seasonNumber - 1; // Store the updated page value

        setSeasonNumber(nextSeason); // Update the page state

        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/tv/${tvDetails.id}/season/${nextSeason}?${params}`);

        if (response.ok) {

            const data = await response.json();

            console.log(data)
            setTVDetailsSeasons(data)
        }
    }

    if (!loading) {
        return (
            <>
                <div>
                    <img className="bg-image w-full h-auto lg:w-screen xl:h-screen" key={tvDetails.id} src={`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`} alt="Album" />
                    <div className="flex justify-center mt-10">
                        <div className="h-full w-11/12">
                            <div className="flex justify-center md:justify-start gap-2">
                                <Link to='/'><button className="btn btn-outline">Home</button></Link>
                                <Link to='/tvshows'><button className="btn btn-outline">TV Shows</button></Link>
                            </div>
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 mt-5">
                                    {tvDetails.poster_path ? (
                                        <img src={`https://image.tmdb.org/t/p/w400${tvDetails.poster_path}`} alt="Album" className="w-full h-auto" />
                                    ) : (
                                        <img src="/src/images/no-image.jpg" alt="Album" />
                                    )}
                                </div>
                                <div className="w-full md:w-3/5 lg:w-2/3 xl:w-3/4 mt-5 flex flex-col gap-5 md:ml-10 align-mid">
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

                                    <div className="flex flex-row md:flex-row justify-between">
                                        <div>
                                            <h1 className="font-bold text-white pb-2">Genres</h1>
                                            {tvDetails.genres?.map((genre) => (
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
                                            {tvDetailsCredits?.cast?.map(({ cast_id, profile_path, name, character }) => (
                                                profile_path ? (
                                                    <SwiperSlide className="bg-white" key={cast_id}>
                                                        <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt="Album" />
                                                        <div className="shadow-md p-3">
                                                            <h1 className="font-bold text-black">{name}</h1>
                                                            <h1>{character}</h1>
                                                        </div>
                                                    </SwiperSlide>
                                                ) : <SwiperSlide className="bg-white rounded-xl" key={cast_id}>
                                                    <img src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`} alt="No Image available" />
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
                                                    <a target='_blank' rel="noreferrer" href={`https://www.facebook.com/${tvDetailsSocials?.facebook_id}`}><FaFacebook style={{ width: '25px', height: '25px' }} /></a>
                                                    <a target='_blank' rel="noreferrer" href={`https://www.instagram.com/${tvDetailsSocials?.instagram_id}`}>< FaInstagram style={{ width: '25px', height: '25px' }} /></a>
                                                    <a target='_blank' rel="noreferrer" href={`https://www.twitter.com/${tvDetailsSocials?.twitter_id}`}><FaSquareTwitter style={{ width: '25px', height: '25px' }} /></a>
                                                    <a target='_blank' rel="noreferrer" href={`https://www.wikidata.org/wiki/${tvDetailsSocials?.wikidata_id}`}><FaWikipediaW style={{ width: '25px', height: '25px' }} /></a>
                                                </div>
                                                <div>
                                                    <span className="font-bold text-white">
                                                        Number Of Episodes:</span> {!tvDetails.number_of_episodes ? (
                                                            <span>No data available</span>
                                                        ) : (
                                                            `${tvDetails.number_of_episodes?.toLocaleString()}`
                                                        )}
                                                </div>
                                                <hr></hr>
                                                <div>
                                                    <span className="font-bold text-white">
                                                        Number Of Seasons:</span> {!tvDetails.number_of_seasons ? (
                                                            <span>No data available</span>
                                                        ) : (
                                                            `${tvDetails.number_of_seasons?.toLocaleString()}`
                                                        )}
                                                </div>
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
                                                <hr></hr>
                                                <div>
                                                    {tvDetails.homepage ? (<a href={tvDetails.homepage} target='_blank' rel="noreferrer" ><button className='btn btn-outline'>Official Webpage</button></a>) : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2">
                                    <h1 className="font-bold text-3xl">Seasons</h1>
                                </div>
                                <div className="bg-white rounded-lg w-full flex mb-5">
                                    <div className="">
                                        <img className="w-full h-full sm:w-84 md:w-60 lg:w-40 xl:w-32"
                                            key={tvDetailsSeasons.id} src={`https://image.tmdb.org/t/p/w500${tvDetailsSeasons.poster_path}`} alt="Album" ></img>
                                    </div>
                                    <div className="p-5">
                                        <h1 className="text-black font-bold text-lg">{tvDetailsSeasons?.name}</h1>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center">
                                                <AiFillStar className="text-yellow-300 mr-1" />
                                                <h1>{tvDetailsSeasons?.vote_average?.toFixed(1)}/10</h1>
                                            </div>
                                            <h1>{tvDetailsSeasons?.air_date?.split('-')[0]}</h1>
                                            {tvDetailsSeasons?.episodes && (
                                                <div>{tvDetailsSeasons.episodes[tvDetailsSeasons.episodes.length - 1].episode_number} Episodes</div>
                                            )}
                                        </div>
                                        <div className="mt-3">
                                            <h1 className="text-black font-bold text-lg">Overview</h1>
                                            {tvDetailsSeasons.overview}
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <button disabled={seasonNumber === 1} className={seasonNumber === 1 ? `btn btn-sm btn-outline cursor-not-allowed no-animation` : `btn btn-sm btn-outline`} onClick={handlePreviousSeason}>Previous Season</button>
                                    <button disabled={seasonNumber === tvDetails.number_of_seasons} className={seasonNumber === tvDetails.number_of_seasons ? `btn btn-sm btn-outline cursor-not-allowed no-animation` : `btn btn-sm btn-outline`} onClick={handleNextSeason}>Next Season</button>
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

export default TVDetails
