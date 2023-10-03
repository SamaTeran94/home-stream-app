import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import MoviesShowsContext from "../context/movies_shows/MoviesShowsContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Carousel = () => {

    const { nowPlayingMovies, fetchNowPlayingMovies } = useContext(MoviesShowsContext)

    useEffect(() => {
        fetchNowPlayingMovies()
    }, [])

    return (

        <div className="h-auto w-auto px-20 py-20 mb-20" style={{ backgroundImage: 'url("https://home-stream-app.vercel.app/showcase-bg.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <div className="flex justify-center mb-10">
                <h1 className="font-bold text-white text-3xl">Now Playing Movies</h1>
            </div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                // slidesPerView={6}
                navigation
                // pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    1536: {
                        slidesPerView: 7,
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
                }}
            >
                {nowPlayingMovies.map(({ id, poster_path }) => (
                    <SwiperSlide key={id}>
                        <Link to={`/movie_details/${id}`}>
                            <img className="h-full w-full cursor-pointer hover:opacity-80 hover:translate-y-2" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Album" />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Carousel
