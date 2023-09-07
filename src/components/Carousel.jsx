import { useEffect, useState } from "react"

const Carousel = () => {

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [loading, setLoading] = useState(true)

    const MOVIES_URL = import.meta.env.VITE_MOVIES_URL;
    const MOVIES_TOKEN = import.meta.env.VITE_MOVIES_TOKEN;

    useEffect(() => {
        fetchUpcomingMovies()
    }, [])

    //Upcoming Movies

    const fetchUpcomingMovies = async () => {

        //const resultsPerPage = 12;

        // Construct query parameters
        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        const response = await fetch(`${MOVIES_URL}/movie/upcoming?${params}`);

        if (response.ok) {
            const { results } = await response.json();

            setUpcomingMovies(results);
            setLoading(false);
        } else {

            console.error('Failed to fetch popular movies.');
            setLoading(false);
        }
    }



    return (
        <div className="h-96 flex">
            <div className="carousel rounded-box">
                <div className="carousel-item">
                    {upcomingMovies.map((movie) => (
                        <div key={movie.id}>
                            <img className="h-96 w-full cursor-pointer hover:opacity-80 hover:translate-y-2" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Album" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel
