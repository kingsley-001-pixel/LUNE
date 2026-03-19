import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart, FaBookmark } from "react-icons/fa";
import { useState } from "react";


    const HorizontalScroll = ({sectionApi}) => {
        const token = localStorage.getItem("token")
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


        return (
            <div className="relative w-full max-w-[100vw]">
                        <div className="flex overflow-x-auto whitespace-wrap scrollbar-hide py-4 px-2 gap-4" style={{WebkitOverflowScrolling: 'touch'}} ref={scrollContainerRef}>
                            {sectionApi.map((movie, index) => (
                    <div key={index} className="bg-lightCard transition snap-start scrollbar-hide text-lightTextMuted overflow-y-auto w-28 h-80 md:w-32 rounded hover:scale-105 rounded-b-lg dark:bg-darkCard dark:text-darkTextMuted flex-shrink-0">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` :  `https://via.placeholder.com/300x450?text=No+Image`} alt={movie.title} className="rounded-lg w-full "/>
                    <div className=" px-2 py-4">

                    <div className="flex justify-between">
                        <div className="relative inline-block group">
                            <button key={movie.id} id="addToFavoritesBtn" className={`fa-heart cursor-pointer transition-colors duration-200 ${
        favorites.some(favId => favId === movie.id)
        ? "fa-solid text-red-400"
        : "fa-regular text-gray-400"
    }`} onClick={isLoggedIn ? () => handleFavorites(movie.id) : () => handleWarning('favorites')}><FaHeart size={20}/>
                        </button>
                        {favorites.some(favId => favId === movie.id)
        ? <span className="group-hover:absolute group-hover:whitespace-nowrap group-hover:text-sm group-hover:bottom-5 group-hover:left-0 group-hover:py-1 rounded-md hidden group-hover:block group-hover:transition-all group-hover:duration-200">Added to favorites</span> : <span className="group-hover:absolute group-hover:whitespace-nowrap group-hover:text-sm group-hover:bottom-5 group-hover:left-0 group-hover:py-1 rounded-md hidden group-hover:block group-hover:transition-all group-hover:duration-200 ">Add to favorites</span>}
                        </div>

                        <div className="relative inline-block group">
                        <button id="addToWatchlistBtn" key={movie.id} className={`fa-bookmark cursor-pointer transition-colors duration-200 ${
        watchlist.some(watchId => watchId === movie.id)
        ? "fa-solid text-blue-400"
        : "fa-regular text-gray-400"
    }`} onClick={isLoggedIn ? () => handleWatchlist(movie.id) : () => handleWarning('watchlist')}><FaBookmark size={20}/></button>
                        {watchlist.some(watchId => watchId === movie.id)
        ? <span className="group-hover:absolute group-hover:whitespace-nowrap group-hover:text-sm group-hover:bottom-5 group-hover:ml-[-76px] group-hover:py-1 hidden group-hover:block transition-all duration-200">Added to watchlist</span> : <span className="group-hover:absolute group-hover:whitespace-nowrap group-hover:text-sm group-hover:bottom-5 group-hover:ml-[-76px] group-hover:py-1 hidden group-hover:block transition-all duration-200">Add to watchlist</span>}
                        </div>
                    </div>

                    <h1 className="text-lightTextMain font-semibold text-xl dark:text-darkTextMain">{movie.title}</h1>
                    <h2 className="text-sm">{movie.release_date}</h2>
                    <h2 className="text-sm">⭐{movie.vote_average}</h2>
                    <p className="mb-2 text-sm">{movie.overview}</p>
                    </div>
                    </div>
                    ))}
                        </div>
                        <button onClick={scrollLeft} className="absolute left-2 top-1/2 transform -translate-y-1/1 w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover hover:opacity-85 transition focus:outline-none focus:ring-2 focus:ring-accent/40 text-center opacity-65">{<FaArrowLeft/>}</button>

                        <button onClick={scrollRight} className="absolute right-2 top-1/2 transform -translate-y-1/1 w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover hover:opacity-85 transition focus:outline-none focus:ring-2 focus:ring-accent/40 text-center opacity-65">{<FaArrowRight/>}</button>
                        </div>
        )
    }

export default HorizontalScroll