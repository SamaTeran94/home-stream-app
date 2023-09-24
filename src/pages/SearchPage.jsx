import SearchCards from '../components/SearchCards.jsx'
import SearchComponent from '../components/Search.jsx'
import { useLocation } from 'react-router-dom';
import Spinner from '../components/layout/Spinner.jsx'


const SearchPage = () => {

    const location = useLocation();
    const searchResults = location.state?.searchResults || [];
    const loading = location.state?.loading || true

    if (!loading) {
        return <Spinner />
    } else {
        return (
            <div className="h-full pb-10 pt-20">
                <SearchComponent />
                <SearchCards searchResults={searchResults} />
            </div>
        )
    }
}

export default SearchPage
