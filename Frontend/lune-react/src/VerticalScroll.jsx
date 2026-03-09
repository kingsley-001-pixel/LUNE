import React, { useState, useEffect } from 'react';
import { FaHeart, FaBookmark } from "react-icons/fa";

function VerticalScroll({Movies}) {  
        const token = localStorage.getItem("token")
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

    return(
        <div className="grid grid-cols-2 gap-12 py-2 px-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 md:mr-5">
                    {Movies.map((movie, index) => (
                        <div key={index} className="bg-lightCard  overflow-y-auto overflow-x-hidden transition h-80 text-lightTextMuted w-40 hover:scale-105 scrollbar-hide dark:bg-darkCard dark:text-darkTextMuted rounded rounded-b-lg">
                            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` :  `https://via.placeholder.com/300x450?text=No+Image`} alt={movie.title} className="rounded-lg w-full h-52 object-cover"/>
                            <div id="movieContent" className=" px-2 py-4">
                                <div className="flex justify-between">
                                                        <div className="relative inline-block group">
                                                            <button key={movie.id} id="addToFavoritesBtn" className={`fa-heart cursor-pointer transition-colors duration-200 ${
                                        favorites.some(favId => favId === movie.id)
                                        ? "fa-solid text-red-400"
                                        : "fa-regular text-gray-400"
                                    }`} onClick={() => handleFavorites(movie.id)}><FaHeart size={20}/>
                                                        </button>
                                                        {favorites.some(favId => favId === movie.id)
                                        ? <span className="group-hover:absolute group-hover:whitespace-nowrap group-hover:text-sm group-hover:bottom-5 group-hover:left-0 group-hover:py-1 rounded-md hidden group-hover:block group-hover:transition-all group-hover:duration-200">Added to favorites</span> : <span className="group-hover:absolute group-hover:whitespace-nowrap group-hover:text-sm group-hover:bottom-5 group-hover:left-0 group-hover:py-1 rounded-md hidden group-hover:block group-hover:transition-all group-hover:duration-200 ">Add to favorites</span>}
                                                        </div>
                                
                                                        <div className="relative inline-block group">
                                                        <button id="addToWatchlistBtn" key={movie.id} className={`fa-bookmark cursor-pointer transition-colors duration-200 ${
                                        watchlist.some(watchId => watchId === movie.id)
                                        ? "fa-solid text-blue-400"
                                        : "fa-regular text-gray-400"
                                    }`} onClick={() => handleWatchlist(movie.id)}><FaBookmark size={20}/></button>
                                                        {watchlist.some(watchId => watchId === movie.id)
                                        ? <span className="group-hover:absolute group-hover:whitespace-nowrap group-hover:text-sm group-hover:bottom-5 group-hover:ml-[-76px] group-hover:py-1 hidden group-hover:block transition-all duration-200">Added to watchlist</span> : <span className="group-hover:absolute group-hover:whitespace-nowrap group-hover:text-sm group-hover:bottom-5 group-hover:ml-[-76px] group-hover:py-1 hidden group-hover:block transition-all duration-200">Add to watchlist</span>}
                                                        </div>
                                                    </div>
                                <h1 className="text-lightTextMain font-semibold text-xl dark:text-darkTextMain">{movie.title}</h1>
                                <h2>{movie.release_date}</h2>
                                <h2>⭐{movie.vote_average}</h2>
                                <p className="mb-2 ">{movie.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>
    )
}

export default VerticalScroll;