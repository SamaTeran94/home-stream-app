import SearchCards from '../components/SearchCards.jsx'
import SearchComponent from '../components/Search.jsx'
import { useContext, useEffect } from 'react';
import Spinner from '../components/layout/Spinner.jsx'
import SearchContext from '../context/movies_shows/SearchContext';

const SearchPage = () => {

    const { searchResults, loading, setLoading, handleSearch, setSearchResults, page, setPage } = useContext(SearchContext)

    useEffect(() => {
        handleSearch();
        setLoading(false)
    }, [])

    if (!loading) {
        return (
            <div className="h-full pb-10 pt-20">
                <SearchComponent />
                <SearchCards searchResults={searchResults} setSearchResults={setSearchResults} page={page} setPage={setPage} setLoading={setLoading} />
            </div>
        )
    } else {
        return <Spinner />
    }
}

export default SearchPage
