import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"
import {HiOutlineUser} from "react-icons/hi2"
// import { FaSignOutAlt, FaBars } from "react-icons/fa"
import { Link } from "react-router-dom"
import MovieRow from "./MovieRow.jsx"
import HorizontalScroll from "./HorizontalScroll.jsx"
import SearchBar from "./SearchBar.jsx"
import NavMenu from "./NavMenu.jsx"

function Dashboard({name='Guest'}) {

    const [username, setusername] = useState("")
    const [Username, setUsername] = useState("")
    const navigate = useNavigate()
    
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token")
        if (!token) {
            navigate('/login')
        }

        const response = await fetch("http://localhost:4000/api/v1/users/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json()
        localStorage.setItem("username", data.user.username)
            } catch (error) {
                console.log('Error fetching response');
            }
        }

    useEffect( () => {
        fetchDashboard();
    }, [])
        

    // TRENDING MOVIES FETCH API
    const [trendingMovies, setTrendingMovies] = useState([])
        const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(false)
        const [trendingMoviesError, setTrendingMoviesError] = useState(false)
    
        const fetchTrendingMovies = async () => {
        try {
            setTrendingMoviesLoading(true)
            const response = await fetch("http://localhost:4000/api/v1/tmdb/trending", {
                method: "GET"})
            if(!response.ok) {
                console.log('Server error');
                setTrendingMoviesError(true)
                setTrendingMoviesLoading(false)
            }
            const data = await response.json()
            // const trimmedData = data.data.results.slice(0,10)
            setTrendingMovies(data.data.results)
            setTrendingMoviesError(false)
            setTrendingMoviesLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTrendingMovies()
    }, [])

    // TOP RATED MOVIES FETCH API
    const [topRatedMovies, setTopRatedMovies] = useState([])
        const [topRatedMoviesLoading, setTopRatedMoviesLoading] = useState(false)
        const [topRatedMoviesError, setTopRatedMoviesError] = useState(false)
    
        const fetchTopRatedMovies = async () => {
        try {
            setTopRatedMoviesLoading(true)
            const response = await fetch("http://localhost:4000/api/v1/tmdb/top-rated", {
                method: "GET"})
            if(!response.ok) {
                console.log('Server error');
                setTopRatedMoviesError(true)
                setTopRatedMoviesLoading(false)
            }
            const data = await response.json()
            setTopRatedMovies(data.data.results)
            setTopRatedMoviesError(false)
            setTopRatedMoviesLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTopRatedMovies()
    }, [])

    
    // UPCOMING MOVIES FETCH API
    const [upcomingMovies, setUpcomingMovies] = useState([])
        const [upcomingMoviesLoading, setUpcomingMoviesLoading] = useState(false)
        const [upcomingMoviesError, setUpcomingMoviesError] = useState(false)
    
        const fetchUpcomingMovies = async () => {
        try {
            setUpcomingMoviesLoading(true)
            const response = await fetch("http://localhost:4000/api/v1/tmdb/upcoming", {
                method: "GET"})
            if(!response.ok) {
                console.log('Server error');
                setUpcomingMoviesError(true)
                setUpcomingMoviesLoading(false)
            }
            const data = await response.json()
            setUpcomingMovies(data.data.results)
            setUpcomingMoviesError(false)
            setUpcomingMoviesLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUpcomingMovies()
    }, [])

    // GETTING USERNAME AND CAPITALIZING THE FIRST LETTER
    useEffect(() => {
        setusername(localStorage.getItem("username"))
        username ? setUsername(username.charAt(0).toUpperCase() + username.slice(1)) : ''
    }, [username])

    

    const genres = [
        {genre: "Action", code: "action"},
        {genre: "Adventure", code: "adventure"},
        {genre: "Animation", code: "animation"},
        {genre: "Comedy", code: "comedy"},
        {genre: "Crime", code: "crime"},
        {genre: "Documentary", code: "documentary"},
        {genre: "Drama", code: "drama"},
        {genre: "Family", code: "family"},
        {genre: "Fantasy", code: "fantasy"},
        {genre: "Horror", code: "horror"},
        {genre: "Romance", code: "romance"},
        {genre: "Sci-Fi", code: "scifi"},
        {genre: "Thriller", code: "thriller"},
        {genre: "War", code: "war"},
        // {genre: "Western", code: "western"},
    ]
    
    // GETTING CURRENT YEAR
    const getYear = new Date().getFullYear();







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
                    
                    <NavMenu/>

                    <SearchBar/>
                </header>

                <section id="hero" className="mt-5 py-2 px-4 relative w-full ">
                    <div id="heroBlock" className="py-2 px-4 h-[17rem] md:h-[50rem]">
                    </div>
                </section>
                
                <section id="genre" className="mt-5">
                    <div className="flex flex-wrap gap-3 py-2 px-4 justify-start md:gap-5 ">
                        {genres.map((genre, index) => (
                            <Link to={`/genre/${genre.code}`} key={index} className="w-fit rounded-md py-1 px-2 font-medium text-white
                    bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40"><p>{`${genre.genre}`}</p></Link>
                        ))}
                    </div>
                </section>

                <section className="block mt-5 mx-3">
                <h1 className="text-2xl font-semibold tracking-widest md:text-3xl text-center">TRENDING MOVIES</h1>
                    {<HorizontalScroll sectionApi={trendingMovies}/>}
                    {trendingMoviesError && <button className="w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 text-center mt-5" onClick={() => fetchTrendingMovies()}>Server error, click to retry</button>}
                    </section>

                <section className="block mt-5 mx-3">
                    <h1 className="text-2xl font-semibold tracking-widest md:text-3xl text-center">TOP RATED MOVIES</h1>
                    {<HorizontalScroll sectionApi={topRatedMovies}/>}
                    {topRatedMoviesError && <button className="w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 mt-5 text-center" onClick={() => fetchTopRatedMovies()}>Server error, click to retry</button>}
                    </section>
                    
                <section className="block mt-5 mx-3">
                    <h1 className="text-2xl font-semibold tracking-widest md:text-3xl text-center">UPCOMING MOVIES</h1>
                    {<HorizontalScroll sectionApi={upcomingMovies}/>}
                    {upcomingMoviesError && <button className="w-fit rounded-md py-1 px-2 font-medium text-white mt-5 bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 text-center" onClick={() => fetchUpcomingMovies()}>Server error, click to retry</button>}
                    </section>

                    <section className="block mt-5">
                        <h2 className="text-3xl font-semibold mb-2 tracking-widest md:text-4xl text-center underline underline-offset-8">Discover By Language</h2>
                        <div className="">
                            <MovieRow title={'Korean'} fetchUrl={"http://localhost:4000/api/v1/tmdb/korean"}/>

                            <MovieRow title={'Japanese'} fetchUrl={"http://localhost:4000/api/v1/tmdb/japanese"}/>

                            <MovieRow title={'Chinese'} fetchUrl={"http://localhost:4000/api/v1/tmdb/chinese"}/>

                            <MovieRow title={'Western'} fetchUrl={"http://localhost:4000/api/v1/tmdb/western"}/>
                        </div>
                    </section>

                    <footer className="flex flex-col gap-3 justify-center items-center text-sm text-lightTextMuted dark:text-darkTextMuted">
                        <p className="text-center">Data provided by <a href="https://www.themoviedb.org/" className="underline hover:text-lightTextMuted">TMBD</a>
                        </p>
                        <p className="text-center">&copy;{getYear} Lune. All rights reserved.</p>
                    </footer>
                </div>
            </div>
    )
}

export default Dashboard;


