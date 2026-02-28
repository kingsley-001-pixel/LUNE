import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"
import { Link } from "react-router-dom";
import { FaHome, FaSpinner, FaArrowUp } from "react-icons/fa";
import ScrollToTop from "./ScrollToTop.jsx";
import VerticalScroll from "./VerticalScroll.jsx";
import SearchBar from "./SearchBar.jsx";



function GenrePage() {
    const { genre } = useParams()
    const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [isShown, setIsShown] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [error, setError] = useState(false)
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
        {genre: "Western", code: "western"},
    ]

    const genreMap = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    mystery: 9648,
    romance: 10749,
    scifi: 878,
    thriller: 53,
    war: 10752,
    }

    const genreId = genreMap[genre]

        const fetchGenreData = async (pageNumber) => {
        try {
            setError(false)
            setIsShown(true)
            const response = await fetch("http://localhost:4000/api/v1/tmdb/genre", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({genre: genreId,
                                        pageNumber: pageNumber
                })
            })

            const data = await response.json()
            
            if(!response.ok) {
                console.log(data.message)
                setError(true)
                setIsShown(false)
                return;
            }


            setMovies(prevMovies => [...prevMovies, ...data.data.results])
            setPage(data.data.page)
            setTotalPages(data.data.total_pages)
            setIsShown(false)
            setError(false)
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        setMovies([])
        setPage(1)
        fetchGenreData(1)
    }, [genreId])

    const [isDark, setIsDark] = useState(false)
        const toggleTheme = () => {
            setIsDark(!isDark)
    
            if(!isDark) {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove('dark')
            }
    }

    // GETTING CURRENT YEAR
    const getYear = new Date().getFullYear();

    const loadMoreMovies = () => {
        if(page >= totalPages) {
            return;
        }
        fetchGenreData(page+1)
    }

    const backToHome = () => {
        navigate('/dashboard')
    }

    // const handleScroll = () => {
    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isShown && page < totalPages) {
    //         loadMoreMovies()
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     }
    // }, [isShown, page, totalPages]) 

    const loadMoreMoviesBtn = document.getElementById('loadMoreMoviesBtn');

    useEffect(() => {
        if (loadMoreMoviesBtn) {
            loadMoreMoviesBtn.addEventListener('click', loadMoreMovies);
        }
        return () => {
            if (loadMoreMoviesBtn) {
                loadMoreMoviesBtn.removeEventListener('click', loadMoreMovies);
            }
        }
    }
    , [loadMoreMoviesBtn, page, totalPages, isShown])



    return(
        <div className="relative
                        bg-lightBg text-lightTextMain min-h-screen dark:bg-darkBg dark:text-darkTextMain box-border font-roboto overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-2 justify-center items-center">
            <header className=" w-full mt-0 pt-0">
                    <h1 className="w-4 ml-3 pr-6 p-2 text-3xl bg-darkBg text-darkTextMain dark:bg-lightBg dark:text-lightTextMain translate-y-7 rounded-t-full font-bold border-none md:text-6xl md:bg-darkBg md:text-darkTextMain md:dark:bg-lightBg md:dark:text-lightTextMain md:w-12 md:pb-0">L</h1>
                    <div className="translate-y-[-40px] translate-x-10 md:ml-16 p-3 md:translate-y-[-40px] md:translate-x-0"><h1 className="text-3xl tracking-widest font-bold">LUNE</h1> <p className="">Discover and save movies worth your time.</p></div>
                    <button type="button" onClick={toggleTheme} className="absolute right-5 top-7 text-red-700 cursor-pointer">{isDark ? (<HiOutlineSun color="#f6f7fb" size={30}/>) : (<HiOutlineMoon color="#0b0f1a" size={30}/>)}</button>

                    <SearchBar/>
            </header>

            <h1 className="font-semibold text-2xl mt-[-40px] md:text-4xl">{genre.toUpperCase()}</h1>

            <section id="genre">
                <div className="flex flex-wrap gap-3 py-2 px-4 justify-start">
                    {genres.map((genre, index) => (
                    <Link to={`/genre/${genre.code}`} key={index} className="w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40"><p>{`${genre.genre}`}</p></Link>))}
                </div>
            </section>

            <section id="movieGrid" className="block">
                {movies.length === 0 ? <FaSpinner id="spinner" className="text-center text-4xl my-5"/> : 
                <VerticalScroll Movies={movies}/>}
                <button onClick={() => fetchGenreData()}>{error ? "Server Error, Click to Retry" : ""}</button>
                {page < totalPages && (
                    <div className="text-center"><button id="loadMoreMoviesBtn" onClick={loadMoreMovies} className="w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40">
                        {isShown ? "Loading..." : "Load More Movies"}
                    </button>
                    </div>
                )}
            </section>


            <footer className="flex flex-col gap-3 justify-center items-center mt-10">
            <button onClick={backToHome} className="w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 text-center flex gap-2">{<FaHome />}Back To Home</button>
                    <p className="text-center">&copy;{getYear} Lune. All rights reserved.</p>
            </footer>

                <ScrollToTop/>
        </div>
        </div>
    )
}

export default GenrePage