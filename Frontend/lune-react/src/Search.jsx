import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"
import { Link } from "react-router-dom";
import { FaHome, FaSpinner, FaSearch } from "react-icons/fa";
import ScrollToTop from "./ScrollToTop.jsx";
import SearchBar from "./SearchBar.jsx";
import VerticalScroll from "./VerticalScroll.jsx";
import NavMenu from "./NavMenu.jsx";


function Search() {
    const navigate = useNavigate();
    const {movieName} = useParams()
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(false)
    const [isShown, setIsShown] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [noMovieFound, setNoMovieFound] = useState(false)
    
        const fetchData = async (pageNumber) => {
            try {
                setIsShown(true)
                setError(false)
                const response = await fetch('http://localhost:4000/api/v1/tmdb/search', {
                    method: "POST",
                headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({moviename: movieName,
                                        pageNumber: pageNumber
                })
                
                })
                if(!response.ok) {
                    console.log('Server error');
                    setError(true)
                    setIsShown(false)
                    return;
                }
            const data = await response.json()
            
            if (data.data.results.length === 0) {
                setNoMovieFound(true)
            }

            setMovies(prevMovies => [...prevMovies, ...data.data.results])
            setPage(data.data.page)
            setTotalPages(data.data.total_pages)
            setIsShown(false)
            } catch (error) {
                console.log(error);
            }
        }
    
        useEffect(() => {
            setMovies([])
            setPage(1)
            fetchData(1)
        }, [movieName])
        
        // GETTING CURRENT YEAR
        const getYear = new Date().getFullYear();
        
        const loadMoreMovies = () => {
            if(page >= totalPages) {
                return;
            }
            fetchData(page+1)
        }

        const backToHome = () => {
        navigate('/dashboard')
    }


    return (
        <div className="relative
                        bg-lightBg text-lightTextMain min-h-screen dark:bg-darkBg dark:text-darkTextMain box-border font-roboto overflow-y-auto">
            <div className="flex flex-col gap-2 justify-center items-center">
            <header className=" w-full mt-0 pt-0">
                <h1 className="w-4 ml-3 pr-6 p-2 text-3xl bg-darkBg text-darkTextMain dark:bg-lightBg dark:text-lightTextMain translate-y-7 md:text-6xl rounded-t-full font-bold border-none md:bg-darkBg md:text-darkTextMain md:dark:bg-lightBg md:dark:text-lightTextMain md:w-12 md:pb-0">L</h1>
                <div className="translate-y-[-40px] translate-x-10 md:ml-16 p-3 md:translate-y-[-40px] md:translate-x-0"><h1 className="text-3xl tracking-widest font-bold">LUNE</h1> <p className="">Discover and save movies worth your time.</p></div>

                <NavMenu/>
                
                <SearchBar/>
            </header>

            <section id="movieGrid" className="block">
                {noMovieFound ? <p className="text-3xl translate-y-24">No movie found!</p> : ''}
                {error === true || movies.length === 0 ? <FaSpinner id="spinner" className="text-center text-4xl my-5"/> : <VerticalScroll Movies={movies}/>
                }
                <br />
                <button onClick={() => fetchData(1)}>{error && noMovieFound ? "Server Error, Click to Retry" : ""}</button>
                {page < totalPages && (
                    <div className="text-center"><button onClick={loadMoreMovies} className="w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40">
                        {isShown ? "Loading..." : "Load More Movies"}
                    </button>
                    </div>
                )}
            </section>

            <footer className="flex flex-col gap-3 justify-center items-center mt-10">
            <button onClick={backToHome} className="w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 text-center flex gap-2">{<FaHome/>}Back To Home</button>
            <p className="text-center">&copy;{getYear} Lune. All rights reserved.</p>
            </footer>

            <ScrollToTop/>
            </div>
        </div>
    )
}

export default Search;