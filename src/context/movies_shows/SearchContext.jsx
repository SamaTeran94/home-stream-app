/* eslint-disable react/prop-types */

import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchContext = createContext()

const MOVIES_URL = import.meta.env.VITE_MOVIES_URL;
const MOVIES_TOKEN = import.meta.env.VITE_MOVIES_TOKEN;

export const SearchProvider = ({ children }) => {

    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(true)
    let [page, setPage] = useState(1)

    //Handle First Search

    const handleSearch = async (e) => {

        setPage(1)
        setSearchResults

        console.log(e)
        if (e) {
            e.preventDefault();
        }

        const formData = e ? new FormData(e.target) : new FormData();

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

            const response = await fetch(`${MOVIES_URL}/${endpoint}?${params}&query=${searchTerm}&page=1`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setSearchResults(data)
            console.log(data)
            setLoading(false)

            navigate(`/search?type=${searchType}&search-term=${searchTerm}&page=1`);

        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    };

    return <SearchContext.Provider value={{
        searchResults,
        setSearchResults,
        loading,
        setLoading,
        handleSearch,
        page,
        setPage
    }}>
        {children}
    </SearchContext.Provider>
}

export default SearchContext

