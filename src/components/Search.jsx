import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(true)

    const MOVIES_URL = import.meta.env.VITE_MOVIES_URL;
    const MOVIES_TOKEN = import.meta.env.VITE_MOVIES_TOKEN;

    const handleSearch = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target); // Get form data

        const searchType = formData.get('type'); // Get the selected search type (movie or tv)
        const searchTerm = formData.get('search-term'); // Get the search term

        const params = new URLSearchParams({
            api_key: MOVIES_TOKEN,
            language: 'en-US',
        });

        try {

            let endpoint;

            if (searchType === 'movie') {
                endpoint = 'search/movie';
            } else if (searchType === 'tv') {
                endpoint = 'search/tv';
            } else {
                throw new Error('Invalid search type');
            }

            const response = await fetch(`${MOVIES_URL}/${endpoint}?${params}&query=${searchTerm}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const { results } = await response.json();
            console.log(results)
            setSearchResults(results)
            setLoading(false)

            navigate(`/search?type=${searchType}&searchTerm=${searchTerm}`, {
                state: { searchResults: results, loading: loading },
            });


            // console.log(typeof searchResults);
        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    };


    return (
        <>
            <div className="flex justify-center mb-20">
                <form action='/search' className="flex flex-col gap-5 w-full items-center"
                    onSubmit={handleSearch}>
                    <div className='flex gap-2 w-3/4'>
                        <input type="radio" name="type" value="movie" className="radio" checked />
                        Movies
                        <input type="radio" name="type" value="tv" className="radio" />
                        TV Shows
                    </div>
                    <div className='flex gap-3 w-3/4'>
                        <input
                            type="text"
                            name='search-term' placeholder="Enter Search Term"
                            className="input input-bordered w-full " />
                        <button className='bg-yellow-300 rounded px-10' type='submit'>
                            <AiOutlineSearch className='text-gray-400' />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Search
