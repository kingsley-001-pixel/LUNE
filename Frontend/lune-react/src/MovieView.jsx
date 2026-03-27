import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart, FaBookmark } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


    const MovieView = ({sectionApi}) => {
        const token = localStorage.getItem("token")
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
                <div className="flex overflow-x-auto whitespace-wrap scrollbar-hide py-4 px-2 gap-4" style={{WebkitOverflowScrolling: 'touch'}}>
                    {<div className="bg-lightCard transition snap-start scrollbar-hide text-lightTextMuted overflow-y-auto w-28 h-80 md:w-32 rounded hover:scale-105 rounded-b-lg dark:bg-darkCard dark:text-darkTextMuted flex-shrink-0">
                    <img src={sectionApi.poster_path ? `https://image.tmdb.org/t/p/w200${sectionApi.poster_path}` :  `https://via.placeholder.com/300x450?text=No+Image`} alt={sectionApi.title} className="rounded-lg w-full "/>
                    
                    <div className=" px-2 py-4">
                        <div className="relative inline-block group">
                            <button key={movie.id} id="addToFavoritesBtn" className={`fa-heart cursor-pointer transition-colors duration-200 ${
        favorites.some(favId => favId === movie.id)
        ? "fa-solid text-red-400"
        : "fa-regular text-gray-400"
    }`} onClick={isLoggedIn ? () => handleFavorites(movie.id) : () => handleWarning('favorites')}><FaHeart size={20}/>
                        </button>
                        </div>

                    <h1 className="text-lightTextMain font-semibold text-xl dark:text-darkTextMain">{sectionApi.title}</h1>
                    <h2 className="text-sm">{sectionApi.release_date}</h2>
                    <h2 className="text-sm">⭐{sectionApi.vote_average}</h2>
                    <p className="mb-2 text-sm">{sectionApi.overview}</p>
                    </div>
                    </div>
                    }
                    </div>
</div>
        )
    }

export default MovieView