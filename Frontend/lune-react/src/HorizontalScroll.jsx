import React from "react";
import { FaArrowLeft, FaArrowRight, FaHeart, FaBookmark } from "react-icons/fa";
import { useState } from "react";
const token = localStorage.getItem("token")

    const HorizontalScroll = ({sectionApi}) => {
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
            console.log(data)
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
                    console.log(data)
                }
            } catch (error) {
                console.log('Error in favorites frontend', error)
            }
        }

//                 const handleFavorites = async (movieId) => {
//     try {
//     const isFavorite = favorites.includes(movieId)
//     const token = localStorage.getItem("token")
//     if (isFavorite) {
//       // Remove from favorites
//         const response = await fetch(
//         "https://lune-backend-eclm.onrender.com/api/v1/users/favorites/remove/",
//         {
//             method: "DELETE",
//             headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ movieId })
//         }
//         )

//         const data = await response.json()
//         // setFavorites(data.favorites)
//         console.log("Removed:", data.favorites)
//     } else {
//       // Add to favorites
//         const response = await fetch(
//         "http://localhost:5173/api/v1/users/favorites/add",
//         {
//             method: "POST",
//             headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ movieId })
//         }
//         )

//         const data = await response.json()
//         // setFavorites(data.favorites)
//         console.log("Added:", data)
//     }
//     } catch (error) {
//     console.log("Error in favorites frontend", error)
//     }
// }

        const [watchlist, setWatchlist] = useState([]);

        const handleWatchlist = (movie) => {
        setWatchlist(prev =>
        prev.some(item => item.id === movie.id)
            ? prev.filter(item => item.id !== movie.id)
            : [...prev, movie]
        );
        };


        return (
            <div className="relative w-full max-w-[100vw]">
                        <div className="flex overflow-x-auto whitespace-wrap scrollbar-hide py-4 px-2 gap-4" style={{WebkitOverflowScrolling: 'touch'}} ref={scrollContainerRef}>
                            {sectionApi.sort((b,a) => a.vote_average - b.vote_average).map((movie, index) => (
                    <div key={index} className="bg-lightCard transition snap-start scrollbar-hide text-lightTextMuted overflow-y-auto w-28 h-80 md:w-32 rounded hover:scale-105 rounded-b-lg dark:bg-darkCard dark:text-darkTextMuted flex-shrink-0">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` :  `https://via.placeholder.com/300x450?text=No+Image`} alt={movie.title} className="rounded-lg w-full "/>
                    <div className=" px-2 py-4">
                    <div className="flex justify-between">
                        <div className="relative inline-block group">
                            <button key={movie.id} id="addToFavoritesBtn" className={`fa-heart cursor-pointer transition-colors duration-200 ${
        favorites.some(favId => favId === movie.id)
        ? "fa-solid text-red-400"
        : "fa-regular text-gray-400"
    }`} onClick={() => handleFavorites(movie.id)}><FaHeart size={20}/>
                        </button>
                        <span className="absolute whitespace-nowrap text-sm absolute bottom-5 left-0 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200">Add to favorites</span>
                        </div>
                        <div className="relative inline-block group">
                        <button id="addToWatchlistBtn" key={movie.id} className={`fa-bookmark cursor-pointer transition-colors duration-200 ${
        watchlist.some(watchId => watchId === movie.id)
        ? "fa-solid text-blue-400"
        : "fa-regular text-gray-400"
    }`} onClick={() => handleWatchlist(movie)}><FaBookmark size={20}/></button>
                        <span className="absolute whitespace-nowrap text-sm absolute bottom-5 ml-[-96px] py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200">Add to watchlist</span>
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