import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import NavMenu from "./NavMenu.jsx";
import SearchBar from "./SearchBar.jsx";
import MovieView from "./MovieView.jsx";
import { FaArrowLeft, FaArrowRight, FaHeart, FaBookmark } from "react-icons/fa";


function MovieDetails() {
    const token = localStorage.getItem("token")
    const [movieDetails, setMovieDetails] = useState({})
    const [movie, setMovie] = useState({})
    const [cast, setCast] = useState([])
    const [trailer, setTrailer] = useState({})
    const [similar, setSimilar] = useState([])
    const [error, setError] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const { id } = useParams()
    const getYear = new Date().getFullYear()

    

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(`https://lune-backend-eclm.onrender.com/api/v1/tmdb/movie?query=${id}`)
            if (!response.ok) {
                    const error = await response.json();
                    console.error(`Movie Details fetch failed: ${error.message}`);
                    return;
                    }
            const data = await response.json()
            setMovieDetails(data)
            setLoaded(false)
        } catch (error) {
            setError(error.message)
            console.log('Error fetching movie data', error);
        }
    }
    useEffect(() => {
        fetchMovieDetails()
    }, [id])

    useEffect(() => {
        if (movieDetails) {
        setMovie(movieDetails.details)
        setCast(movieDetails.cast)
        setTrailer(movieDetails.trailer)
        setSimilar(movieDetails.similar) 
        }
        setLoaded(true)
    }, [movieDetails])

    useEffect(() => {
    }, [movie])

            const [isLoggedIn, setIsLoggedIn] = useState(false)
            useEffect(() => {
                if (token) {
                    setIsLoggedIn(true)
                } else {
                    setIsLoggedIn(false)
                }
            }, [])
    
            const [favorites, setFavorites] = useState([]);
    
            const handleFavorites = async (movieId) => {
                try {
                    const isFavorite = favorites.some(favId => favId === movieId)
                    if (isFavorite) {
                        setFavorites(prev => prev.filter(favId => favId !== movieId))
                const response = await fetch(`https://lune-backend-eclm.onrender.com/api/v1/users/favorites/remove/${movieId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
        }})
                const data = await response.json()
                alert("Removed from favorites")
                    }               else {
                        setFavorites(prev => [...prev, movieId])
                const response = await fetch(`https://lune-backend-eclm.onrender.com/api/v1/users/favorites/add`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({movieId})
    })
                        const data = await response.json()
                    } 
                } catch (error) {
                    console.log('Error in favorites frontend', error)
                }
            }
    
            const getFavorites = async () => {
                try {
                    const response = await fetch(`https://lune-backend-eclm.onrender.com/api/v1/users/favorites`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
        }})
                const data = await response.json()
                const favoriteIds = data.favorites
                setFavorites(favoriteIds || [])
                } catch (error) {
                    console.log('Error fetching favorites', error)
                }
            }
    
            useEffect(() => {
                getFavorites()
            }, [])
    
            const [watchlist, setWatchlist] = useState([]);
    
            const handleWatchlist = async (movieId) => {
                try {
                    const isWatchlist = watchlist.some(watchId => watchId === movieId)
                    if (isWatchlist) {
                        setWatchlist(prev => prev.filter(watchId => watchId !== movieId))
                const response = await fetch(`https://lune-backend-eclm.onrender.com/api/v1/users/watchlist/remove/${movieId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }})
                const data = await response.json()
                alert("Removed from watchlist")
                    }               
                    else {
                        setWatchlist(prev => [...prev, movieId])
                        const response = await fetch(`https://lune-backend-eclm.onrender.com/api/v1/users/watchlist/add`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({movieId})
                    })
                        const data = await response.json()
                    }
                } catch (error) {
                    console.log('Error in watchlist frontend', error)
                }
            }
    
            const getWatchlist = async () => {
                try {
                    const response = await fetch(`https://lune-backend-eclm.onrender.com/api/v1/users/watchlist`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
        }})
                const data = await response.json()
                const watchlistIds = data.watchlist
                setWatchlist(watchlistIds || [])
                } catch (error) {
                    console.log('Error fetching watchlist', error)
                }
            }
    
            useEffect(() => {
                getWatchlist()
            }, [])
    
    
            const handleWarning = (type) => {
                if(type === 'favorites') {
                    alert("Please log in to add to favorites")
                } else if (type === 'watchlist') {
                    alert("Please log in to add to watchlist")
                }
            }

            const handleMinsToHour = (value) => {
                let hour = 0;
                let mins = 0;
                let hr;
                let min
                while(value >= 60) {
                    value = value - 60
                    hour += 1;
                }
                mins += value;
                if (hour > 1) {
                    hr = "hrs"
                } else {
                    hr = "hr"
                }
                mins ? min = mins + "mins" : min = ""
                return `${hour}${hr} ${min}`
            }

            const scrollContainerRef = React.useRef(null)
            
                    const scrollLeft = () => {
                        scrollContainerRef.current.scrollBy({
                            left: -380,
                            behavior: "smooth"
                        })
                    }
            
                    const scrollRight = () => {
                        scrollContainerRef.current.scrollBy({
                            left: 380,
                            behavior: "smooth"
                        })
                    }



    return (
        <div className="relative scrollbar-hide
                        bg-lightBg text-lightTextMain h-screen dark:bg-darkBg dark:text-darkTextMain box-border font-roboto overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col gap-2 justify-center items-center">
                
                <header className=" w-full mt-0 pt-0">
                    <h1 className="w-4 ml-3 pr-6 p-2 text-3xl bg-darkBg text-darkTextMain dark:bg-lightBg dark:text-lightTextMain translate-y-7 md:text-6xl rounded-t-full font-bold border-none md:bg-darkBg md:text-darkTextMain md:dark:bg-lightBg md:dark:text-lightTextMain md:w-12 md:pb-0">L</h1>
                    <div className="translate-y-[-40px] translate-x-10 md:ml-16 p-3 md:translate-y-[-40px] md:translate-x-0"><h1 className="text-3xl tracking-widest font-bold">LUNE</h1> <p>Discover and save movies worth your time.</p></div>
                    <div>
                    </div>
                    <NavMenu/>
                </header>

                <section className="block mt-5 mx-3">
                    {!movie ? (<p className="text-center">Loading...</p>) : 
                    <div className="flex flex-col md:flex-row gap-6">

                    {/* Poster */}
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} className="rounded-lg w-48"/>

                    {/* Info */}
                    <div className="flex flex-col gap-3">

    <h1 className="text-3xl font-bold">{movie.title}</h1>

    <p>
        {movie.release_date} • {handleMinsToHour(movie.runtime)} • ⭐ {movie.vote_average}
    </p>
    <div className="flex gap-8">
        <p>
            {movie.genres?.map(g => g.name).join(", ")}
        </p>
        <div className="relative inline-block group">

    <button
    className={`cursor-pointer ${
        favorites.some(favId => favId === movie.id)
        ? "text-red-400"
        : "text-gray-400"
    }`}
    onClick={
        isLoggedIn
        ? () => handleFavorites(movie.id)
        : () => handleWarning("favorites")
    }
    >
    <FaHeart size={20} />
    </button>

    <span
    className="absolute left-1/2 -translate-x-1/2 bottom-7
                text-xs whitespace-nowrap px-2 py-1 rounded-md
                bg-black text-white
                opacity-0 group-hover:opacity-100
                transition duration-200 pointer-events-none"
    >
    {favorites.some(favId => favId === movie.id)
        ? "Added to favorites"
        : "Add to favorites"}
    </span>

</div>
        <div className="relative inline-block group">
    <button
    className={`cursor-pointer ${
        watchlist.some(watchId => watchId === movie.id)
        ? "text-blue-400"
        : "text-gray-400"
    }`}
    onClick={
        isLoggedIn
        ? () => handleWatchlist(movie.id)
        : () => handleWarning("watchlist")
    }
    >
    <FaBookmark size={20} />
    </button>
    <span
    className="absolute left-1/2 -translate-x-1/2 bottom-7 
                text-xs whitespace-nowrap px-2 py-1 rounded-md
                bg-black text-white
                opacity-0 group-hover:opacity-100
                transition duration-200 pointer-events-none"
    >
    {watchlist.some(watchId => watchId === movie.id)
        ? "Added to watchlist"
        : "Add to watchlist"}
    </span>

</div>
    </div>
        <p className="text-sm opacity-80">
            {movie.overview}
        </p>
                    </div>
                    </div>}
                </section>

                <section id="castSection">
                    {/* Cast */}
                    <div className="relative w-full max-w-[100vw]">
                    <div className="flex overflow-x-auto whitespace-wrap scrollbar-hide py-4 px-2 gap-4" style={{WebkitOverflowScrolling: 'touch'}} ref={scrollContainerRef}>
                    {movie.cast?.map((cast, index) => (
                    <div key={index} className="bg-lightCard transition snap-start scrollbar-hide text-lightTextMuted overflow-y-auto w-28 h-80 md:w-32 rounded hover:scale-105 rounded-b-lg dark:bg-darkCard dark:text-darkTextMuted flex-shrink-0">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${cast.profile_path}` :  `https://via.placeholder.com/300x450?text=No+Image`} alt={movie.title} className="rounded-lg w-full "/>
                    
                    <div className=" px-2 py-4">
                    <h1 className="text-lightTextMain font-semibold text-xl dark:text-darkTextMain">{cast.original_name}</h1>
                    <h2 className="text-sm">{cast.character}</h2>
                    </div>
                    </div>
                    ))}
                    </div>
                    <button onClick={scrollLeft} className="absolute left-2 top-1/2 transform -translate-y-1/1 w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover hover:opacity-85 transition focus:outline-none focus:ring-2 focus:ring-accent/40 text-center opacity-65">{<FaArrowLeft/>}</button>

                    <button onClick={scrollRight} className="absolute right-2 top-1/2 transform -translate-y-1/1 w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover hover:opacity-85 transition focus:outline-none focus:ring-2 focus:ring-accent/40 text-center opacity-65">{<FaArrowRight/>}</button>
                    </div>
                    </section>

                    <section id="trailerSection">
                    <h2 className="text-xl font-semibold">Trailer</h2>

                    {movieDetails.trailer ? (
                    <iframe
                    className="w-full h-[200px] md:h-[400px] md:-w-full rounded-lg mt-2"
                    src={`https://www.youtube.com/embed/${movieDetails.trailer.key}`}
                    title="Movie Trailer"
                    allowFullScreen
                    />)
                    : (
                    <p>No trailer available</p>
                        )}
                    </section>

                {/* <section className="block mt-5 mx-3">
                    <h1 className="text-2xl font-semibold tracking-widest md:text-3xl text-center">TOP RATED MOVIES</h1>
                    {movieDetails ? <MovieView sectionApi={movieDetails.similar}/> : <p className="text-center">Loading...</p>}
                    {error && <button className="w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 mt-5 text-center" onClick={() => fetchMovieDetails()}>Server error, click to retry</button>}
                    </section> */}

                    <footer className="flex flex-col gap-3 justify-center items-center text-sm text-lightTextMuted dark:text-darkTextMuted">
                        <p className="text-center">Data provided by <a href="https://www.themoviedb.org/" className="underline hover:text-lightTextMuted">TMBD</a>
                        </p>
                        <p className="text-center">&copy;{getYear} Lune. All rights reserved.</p>
                    </footer>
                </div>
            </div>
    )
}

export default MovieDetails;