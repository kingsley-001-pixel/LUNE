import NavMenu from "./NavMenu.jsx"
import { HiOutlineUser } from "react-icons/hi2"
import React,{useState, useEffect} from "react"
import { data } from "react-router"
function Favorites() {
    
    const [movieIds, setMovieIds] = useState([])
    const [movies, setMovies] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)
    const token = localStorage.getItem("token")

    const fetchFavorites = async () => {
        try {
            const response = await fetch("https://lune-backend-eclm.onrender.com/api/v1/users/favorites", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
        if (data.favorites.length > 0) {
            setIsFavorite(true)
            setMovieIds(data.favorites) }
        if (data.favorites.length === 0) {
            setIsFavorite(false) }
        } catch (error) {
            console.log('Error fetching response');
        }
    }

    useEffect(() => {
        fetchFavorites()

    }, [])

    // GETTING AND CAPITALIZING USERNAME
    const [username, setusername] = useState("")
    const [Username, setUsername] = useState("")
    useEffect(() => {
        setusername(localStorage.getItem("username"))
        username ? setUsername(username.charAt(0).toUpperCase() + username.slice(1)) : ''
    }, [username])
    
    // GETTING CURRENT YEAR
    const getYear = new Date().getFullYear();

    
    // GETTING FAVORITE MOVIES
    useEffect(() => {
        const fetchMovies = async (id) => {
            try {
                const response = await fetch(`https://lune-backend-eclm.onrender.com/api/v1/tmdb/searchbyid?query=${id}`)
                if (!response.ok) {
                    const error = await response.json();
                    console.error(`Movie fetch failed: ${error.message}`);
                    return;
                    }
                // const data = await response.json()
                console.log(response)
            } catch (error) {
                console.log('Error fetching movie data', error);
            }
        }

        movieIds.forEach((id) => {
            fetchMovies(id)
        })
    }, [movieIds])

    return (
        <div className="relative scrollbar-hide
                        bg-lightBg text-lightTextMain h-screen dark:bg-darkBg dark:text-darkTextMain box-border font-roboto overflow-y-auto">
                <div className="flex flex-col gap-2 justify-center items-center">
                
                <header className=" w-full mt-0 pt-0">
                    <h1 className="w-4 ml-3 pr-6 p-2 text-3xl bg-darkBg text-darkTextMain dark:bg-lightBg dark:text-lightTextMain translate-y-7 md:text-6xl rounded-t-full font-bold border-none md:bg-darkBg md:text-darkTextMain md:dark:bg-lightBg md:dark:text-lightTextMain md:w-12 md:pb-0">L</h1>
                    <div className="translate-y-[-40px] translate-x-10 md:ml-16 p-3 md:translate-y-[-40px] md:translate-x-0"><h1 className="text-3xl tracking-widest font-bold">LUNE</h1> <p>Discover and save movies worth your time.</p></div>
                    <div>
                        
                    </div>
                    <div className="text-center items-center pl-3">
                        <button className="bg-accent p-1 text-6xl rounded-full md:text-8xl">{<HiOutlineUser color="white"/>}</button>
                        <h1 className="text-3xl md:text-4xl"> {Username || name}</h1>
                    </div>
                        <br />
                    <NavMenu />
                </header>

                <div className="flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-3xl font-bold">Your Favorites</h1>
                    {isFavorite ? (
                        <div className="grid grid-cols-2 gap-12 py-2 px-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 md:mr-5">
                            {movies.map((movieId, index) => (
                                <div key={index} className="bg-lightCard  overflow-y-auto overflow-x-hidden transition h-80 text-lightTextMuted w-40 hover:scale-105 scrollbar-hide dark:bg-darkCard dark:text-darkTextMuted rounded rounded-b-lg">
                                    <img src={`https://image.tmdb.org/t/p/w500${movieId.posterPath}`} alt={movieId.title} className="w-full h-full object-cover rounded rounded-b-lg"/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>You have no favorite movies yet. Start exploring and add some to your favorites!</p>
                    )}
                    </div>

                <footer className="flex flex-col gap-3 justify-center items-center text-sm text-lightTextMuted dark:text-darkTextMuted">
                        <p className="text-center">Data provided by <a href="https://www.themoviedb.org/" className="underline hover:text-lightTextMuted">TMBD</a>
                        </p>
                        <p className="text-center">&copy;{getYear} Lune. All rights reserved.</p>
                    </footer>
                </div>
                </div>
    )
}

export default Favorites