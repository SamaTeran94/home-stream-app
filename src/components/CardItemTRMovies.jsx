import { Link } from "react-router-dom";

const CardItemTRMovies = ({ topRatedMovies }) => {
    return (
        topRatedMovies.map(({ id, poster_path, release_date, original_title }) => (
            <div key={id} className="relative bg-yellow-300 text-white font-bold rounded-lg shadow-md p-2 cursor-pointer hover:translate-y-2">
                <Link to={`/movie_details/${id}`}>
                    <div className="group">
                        {poster_path ? (
                            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Album" />
                        ) : (
                            <img src="/src/images/no-image.jpg" alt="Album" />
                        )}
                        {/* Year overlay */}
                        <div className="text-xl text-white absolute top-1 left-1 bg-info p-2 rounded-lg pointer-events-none">
                            {release_date.substring(0, 4)}
                        </div>
                    </div>
                </Link>
                <div className="flex justify-center text-center mt-2">
                    <h2>{original_title}</h2>
                </div>
            </div>
        ))
    )
}

export default CardItemTRMovies
