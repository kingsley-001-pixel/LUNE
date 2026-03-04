import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaHeart, FaBookmark } from "react-icons/fa";

function VerticalScroll({Movies}) {

    const [favorites, setFavorites] = useState([]);
    
            const handleFavorites = (movie) => {
            setFavorites(prev =>
            prev.some(fav => fav.id === movie.id)
            ? prev.filter(fav => fav.id !== movie.id)
            : [...prev, movie]
            );
            };
    
            const [watchlist, setWatchlist] = useState([]);
    
            const handleWatchlist = (movie) => {
            setWatchlist(prev =>
            prev.some(item => item.id === movie.id)
                ? prev.filter(item => item.id !== movie.id)
                : [...prev, movie]
            );
            };
    
    return(
        <div className="grid grid-cols-2 gap-12 py-2 px-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 md:mr-5">
                    {Movies.sort((b,a) => a.vote_average - b.vote_average).map((movie, index) => (
                        <div key={index} className="bg-lightCard  overflow-y-auto overflow-x-hidden transition h-80 text-lightTextMuted w-40 hover:scale-105 scrollbar-hide dark:bg-darkCard dark:text-darkTextMuted rounded rounded-b-lg">
                            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` :  `https://via.placeholder.com/300x450?text=No+Image`} alt={movie.title} className="rounded-lg w-full h-52 object-cover"/>
                            <div id="movieContent" className=" px-2 py-4">
                                <div className="flex justify-between">
                                    <div className="relative inline-block group">
                                    <button key={movie.id} id="addToFavoritesBtn" className={`fa-heart cursor-pointer transition-colors duration-200 ${
                                        favorites.some(fav => fav.id === movie.id)
                                        ? "fa-solid text-red-400"
                                        : "fa-regular text-gray-400"
                                    }`} onClick={() => handleFavorites(movie)}><FaHeart size={20}/>
                                    </button>
                                    <span className="absolute whitespace-nowrap text-sm absolute bottom-5 left-0 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200">Add to favorites</span>
                                    </div>
                                    <div className="relative inline-block group">
                                    <button id="addToWatchlistBtn" key={movie.id} className={`fa-bookmark cursor-pointer transition-colors duration-200 ${
                                        watchlist.some(fav => fav.id === movie.id)
                                        ? "fa-solid text-blue-400"
                                        : "fa-regular text-gray-400"
                                    }`} onClick={() => handleWatchlist(movie)}><FaBookmark size={20}/></button>
                                    <span className="absolute whitespace-nowrap text-sm absolute bottom-5 ml-[-96px] py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200">Add to watchlist</span>
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