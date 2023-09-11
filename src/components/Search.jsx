import { AiOutlineSearch } from 'react-icons/ai'

const Search = () => {
    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col gap-5 w-full items-center">
                    <div className='flex gap-2 w-3/4'>
                        <input type="radio" name="radio-1" className="radio" checked />
                        Movies
                        <input type="radio" name="radio-1" className="radio" />
                        TV Shows
                    </div>
                    <div className='flex gap-3 w-3/4'>
                        <input type="text" placeholder="Enter Search Term" className="input input-bordered w-full " />
                        <button className=' bg-yellow-300 rounded px-10'>
                            <AiOutlineSearch className='text-gray-400' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search
