import SearchCardsItem from "./SearchCardsItem"
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom';

const SearchCards = ({ searchResults, setSearchResults, page, setPage, setLoading }) => {

    // const filteredResults = searchResults.results.filter(item => item.poster_path !== null);

    const location = useLocation();
    const navigate = useNavigate();
    const searchTerm = new URLSearchParams(location.search).get('search-term');
    const searchType = new URLSearchParams(location.search).get('type')
    console.log(page)

    const MOVIES_URL = import.meta.env.VITE_MOVIES_URL;
    const MOVIES_TOKEN = import.meta.env.VITE_MOVIES_TOKEN;

    //Next Button

    const handleNextButton = async () => {

        const newPage = page + 1; // Store the updated page value

        setPage(newPage); // Update the page state

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

            const response = await fetch(`${MOVIES_URL}/${endpoint}?${params}&query=${searchTerm}&page=${newPage}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setSearchResults(data)
            console.log(data)
            setLoading(false)

            navigate(`/search?type=${searchType}&search-term=${searchTerm}&page${newPage}`);

        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    }

    //Prev Button

    const handlePrevButton = async () => {

        const newPage = page - 1; // Store the updated page value

        setPage(newPage); // Update the page state

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

            const response = await fetch(`${MOVIES_URL}/${endpoint}?${params}&query=${searchTerm}&page=${newPage}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setSearchResults(data)
            console.log(data)
            setLoading(false)

            navigate(`/search?type=${searchType}&search-term=${searchTerm}&page${newPage}`);

        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    }

    return (

        <div className="flex flex-col gap-5">
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full px-5">
                    <div className="flex justify-center mb-5">
                        <h1 className="font-bold text-white text-2xl">{`${searchResults.results.length} of ${searchResults.total_results} results for ${searchTerm}`}</h1>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 px-4 gap-5">

                        <SearchCardsItem searchResults={searchResults} />
                    </div>
                    <div className="join mt-5 flex justify-start pl-4">
                        <button onClick={handlePrevButton} className={searchResults.page === 1 ? `join-item btn btn-outline cursor-not-allowed no-animation` : `join-item btn btn-outline`}>Previous page</button>
                        <button onClick={handleNextButton} className={searchResults.page === searchResults.total_pages ? `join-item btn btn-outline cursor-not-allowed no-animation` : `join-item btn btn-outline`}>Next page</button>
                    </div>
                    <div className="mt-1 flex justify-start pl-4">
                        <h1 className="font-bold text-white text-lg">{`Page ${searchResults.page} of ${searchResults.total_pages}`}</h1>
                    </div>
                </div>
            </div>
        </div >

    )
}

SearchCards.propTypes = {
    searchResults: PropTypes.object,
    setSearchResults: PropTypes.func,
    page: PropTypes.number,
    setPage: PropTypes.func,
    setLoading: PropTypes.bool
}

export default SearchCards
