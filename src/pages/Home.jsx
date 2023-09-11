import Cards from "../components/Cards"
import Carousel from "../components/Carousel"
import Search from "../components/Search"

const Home = () => {

    return (
        <div className="flex flex-col h-full gap-20 pb-10">
            <Carousel />
            <Search />
            <Cards />
        </div>
    )
}

export default Home
