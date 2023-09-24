import SearchCardsItem from "./SearchCardsItem"
import PropTypes from 'prop-types'

const SearchCards = ({ searchResults }) => {
    return (
        <div className="flex flex-col gap-5">
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full px-5">
                    <div className="flex justify-center mb-5">
                        <h1 className="font-bold text-white text-3xl">Search Results</h1>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 px-4 gap-5">
                        <SearchCardsItem searchResults={searchResults} />
                    </div>
                </div>
            </div>
        </div >
    )
}

SearchCards.propTypes = {
    searchResults: PropTypes.array
}

export default SearchCards
