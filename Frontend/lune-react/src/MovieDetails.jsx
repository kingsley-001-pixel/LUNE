import { useParams } from "react-router-dom"
import React, { useState, useEffect, useRef } from "react"
import NavMenu from "./NavMenu.jsx";
import SearchBar from "./SearchBar.jsx";
import HorizontalScroll from "./HorizontalScroll.jsx";
import { FaArrowLeft, FaArrowRight, FaHeart, FaBookmark } from "react-icons/fa";


function MovieDetails() {
    const token = localStorage.getItem("token");
    const reviewRef = useRef(null);
    const [movieDetails, setMovieDetails] = useState({});
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState({});
    const [similar, setSimilar] = useState([]);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [toast, setToast] = useState("");
    const [liked, setLiked] = useState(false);
    const [user, setUser] = useState(null);
    const baseURL = "https://lune-backend-eclm.onrender.com"
    const { id } = useParams()
    const getYear = new Date().getFullYear()

    

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(`${baseURL}/api/v1/tmdb/movie?query=${id}`)
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

    const submitReview = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:4000/api/v1/reviews/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
        movieId: id,
        comment,
        rating
    })
    });

    setTimeout(() => {
    reviewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);

    setToast("Review posted 🎉");
    setTimeout(() => setToast(""), 2000);
    setShowModal(false);
    fetchReviews();
};
    const fetchReviews = async () => {
    const res = await fetch(`http://localhost:4000/api/v1/reviews/${id}`);
    const data = await res.json();
    setReviews(data);
};
useEffect(() => {
    fetchMovieDetails()
    fetchReviews();
}, [id]);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
}, []);

    const handleLike = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:4000/api/v1/reviews/like/${id}`, {
    method: "PUT",
    headers: {
        Authorization: `Bearer ${token}`
    }
    });

    fetchReviews();
};

    const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:4000/api/v1/reviews/${id}`, {
    method: "DELETE",
    headers: {
        Authorization: `Bearer ${token}`
    }
    });

    fetchReviews();
};

    useEffect(() => {
        if (movieDetails) {
        setMovie(movieDetails?.details || [])
        setCast(movieDetails?.cast || [])
        setTrailer(movieDetails?.trailer || [])
        setSimilar(movieDetails?.similar || []) 
        }
        setLoaded(true)
    }, [movieDetails])

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
            

            const avgRating =
    reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : 0;

    const [sort, setSort] = useState("new");

const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === "top") return (b.likes?.length || 0) - (a.likes?.length || 0);
    return new Date(b.createdAt) - new Date(a.createdAt);
});

    const topReviewId = reviews?.reduce((max, r) =>
    r.likes.length > (max?.likes.length || 0) ? r : max,null)?._id;



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

                {toast && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                {toast}
                </div>
                )}

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
                    {cast.map((actor, index) => (
                    <div key={index} className="bg-lightCard transition snap-start scrollbar-hide text-lightTextMuted overflow-y-auto w-28 h-80 md:w-32 rounded hover:scale-105 rounded-b-lg dark:bg-darkCard dark:text-darkTextMuted flex-shrink-0">
                    <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` :  `https://via.placeholder.com/300x450?text=No+Image`} alt={actor.original_name} className="rounded-lg w-full "/>
                    <div className=" px-2 py-4">
                    <h1 className="text-lightTextMain font-semibold text-xl dark:text-darkTextMain">{actor.original_name}</h1>
                    <h2 className="text-sm">{actor.character}</h2>
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
                    {movieDetails.trailer?.key ? (
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

                    <section className="block mt-5 mx-3">
                    <h1 className="text-2xl font-semibold tracking-widest md:text-3xl text-center">SIMILAR MOVIES</h1>
                    {<HorizontalScroll sectionApi={similar}/>}
                    </section>

                    <section id="reviewsSection">
                    {reviews.length === 0 && (
  <div className="text-center py-10">
    <p className="text-gray-400">No reviews yet</p>

    <p className="text-sm text-gray-500 mt-1">
      Be the first to share your thoughts 🎬
    </p>

    <button
      onClick={() => setShowModal(true)}
      className="mt-4 bg-primary px-4 py-2 rounded-lg text-white hover:bg-primaryHover"
    >
      Write First Review
    </button>
  </div>
)}
                    {reviews.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold tracking-widest md:text-3xl text-center">REVIEWS</h1>
                    <button onClick={() => setShowModal(true)} className="bg-primary px-4 py-2 rounded-lg text-white hover:bg-primaryHover">Write a Review</button>
                    </div>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-semibold">{avgRating}</span>
                    <span className="text-sm text-gray-400">({reviews.length} reviews)</span>
                    </div>
                    <select className="text-darkTextMain bg-black border border-gray-600 focus:ring-accent" onChange={(e) => setSort(e.target.value)}>
                    <option value="new">Newest</option>
                    <option value="top">Top</option>
                    </select>

                    <div ref={reviewRef}></div>
                    {sortedReviews.map((review) => (
                    <div key={review._id} className={`hover:scale-[1.01] hover:shadow-lg p-4 rounded-xl border border-t-lightCard w-[23rem] transition duration-200 ${review._id === topReviewId
                    ? "border-yellow-400 border bg-yellow-500/10"
                    : "bg-darkCard"
                    }`}>
                    <div className="flex justify-between">
                    <p className={`font-semibold text-[0.75rem] ${review._id === topReviewId
                    ? "text-lightTextMain"
                    : "text-darkTextMain"
                    }`}>{review.username}:</p>

                    <div>
                    {[...Array(5)].map((_, i) => (
                    <span key={i} className={`transition-transform hover:scale-125 text-sm ${review._id === topReviewId
                    ? "text-lightTextMain"
                    : "text-darkTextMain"
                    }`}>
                    {i < review.rating ? "★" : "☆"}
                    </span>
                    ))}
                    </div>
                    </div>

                    <div className="flex relative">
                    <p className={`text-sm ${review._id === topReviewId
                    ? "text-lightTextMain"
                    : "text-darkTextMain"
                    }`}>
                    {review.comment} 
                    </p>

                    <span className={` text-[0.5rem] tracking-widest absolute top-[1.25rem] opacity-75 ${review._id === topReviewId
                    ? "text-lightTextMain"
                    : "text-darkTextMain"
                    }`}>{new Date(review.createdAt).toLocaleDateString()}</span>

                    <div className="flex gap-3">

                    {/* LIKE */}
                    <button onClick={() => {handleLike(review._id); 
                    setLiked(true); 
                    setTimeout(() => setLiked(false), 500);
                    }} 
                    className={`absolute right-0 transition transform active:scale-125 ${review._id === topReviewId
                    ? "text-lightTextMain"
                    : "text-darkTextMain"
                    }`}>
                    ❤️ {review.likes?.length || 0}
                    </button>

                    {/* DELETE (ONLY OWNER)
                    {
                    user?.id === review.userId && 
                    (
                    <button onClick={() => handleDelete(review._id)} className="absolute left-40 bottom-0 text-sm text-gray-400 hover:text-red-500 transition transform active:scale-125">
                    Delete
                    </button>
                    )
                    } */}

                    </div>
                    </div>

                    </div>
                    ))}
                    </section>

                    {/* REVIEW MODAL */}
                    {showModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    {/* Backdrop click to close */}
    <div
      className="absolute inset-0"
      onClick={() => setShowModal(false)}
    ></div>

    {/* Modal card */}
    <div className="relative w-[92%] max-w-md bg-darkCard rounded-2xl p-6 shadow-2xl animate-fadeIn">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">
          Write a Review
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="active:scale-95 transition text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>
      </div>

      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="transition active:scale-95 text-2xl"
          >
            <span className={star <= rating ? "text-yellow-400" : "text-gray-600"}>
              ★
            </span>
          </button>
        ))}
      </div>

      {/* Comment box */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts about this movie..."
        className="w-full h-28 p-3 rounded-lg bg-black/30 border border-gray-700 
                   text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      />

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-5">

        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 text-sm text-gray-400 hover:text-white"
        >
          Cancel
        </button>

        <button
          onClick={submitReview}
          disabled={!comment || rating === 0}
          className="px-5 py-2 text-sm bg-primary hover:bg-primaryHover disabled:opacity-50 
                     text-white rounded-lg transition"
        >
          Post Review
        </button>

      </div>

    </div>
  </div>
)}

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