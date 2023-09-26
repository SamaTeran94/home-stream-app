import { AiOutlineSearch } from 'react-icons/ai'
import { useContext, useState } from 'react';
import SearchContext from '../context/movies_shows/SearchContext';

const Search = () => {

    const { handleSearch } = useContext(SearchContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('movie'); // Set an initial search type


    return (
        <>
            <div className="flex justify-center mb-20">
                <form
                    className="flex flex-col gap-5 w-full items-center"
                    onSubmit={(e) => handleSearch(e)}
                >
                    <div className='flex gap-2 w-3/4'>
                        <input
                            type="radio"
                            name="type"
                            value="movie"
                            className="radio"
                            checked={searchType === 'movie'}
                            onChange={() => setSearchType('movie')}
                        />
                        Movies
                        <input
                            type="radio"
                            name="type"
                            value="tv"
                            className="radio"
                            checked={searchType === 'tv'}
                            onChange={() => setSearchType('tv')}
                        />
                        TV Shows
                    </div>
                    <div className='flex gap-3 w-3/4'>
                        <input
                            type="text"
                            name='search-term'
                            placeholder="Enter Search Term"
                            className="input input-bordered w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className='bg-yellow-300 rounded px-10' type='submit'>
                            <AiOutlineSearch className='text-gray-400' />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Search
