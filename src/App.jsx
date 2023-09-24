
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import TVShows from "./pages/TVshows"
import NotFound from './pages/NotFound.jsx'
import SearchPage from "./pages/SearchPage"
import { MoviesShowsProvider } from "./context/movies_shows/MoviesShowsContext"
import MovieDetails from "./pages/MovieDetails"
import TVDetails from "./pages/TVDetails"

function App() {

  return (
    <>
      <MoviesShowsProvider>
        <Router>
          <div className="flex flex-col h-screen justify-between">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tvshows" element={<TVShows />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/tv_details/:id" element={<TVDetails />} />
                <Route path="/movie_details/:id" element={<MovieDetails />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MoviesShowsProvider>
    </>
  )
}

export default App
