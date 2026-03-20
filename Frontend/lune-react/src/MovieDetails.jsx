import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavMenu from "./NavMenu.jsx";
import SearchBar from "./SearchBar.jsx";
import HorizontalScroll from "./HorizontalScroll.jsx";
import { Link } from "react-router-dom";

function MovieDetails() {
    const token = localStorage.getItem("token")
    const [movieDetails, setMovieDetails] = useState({})
    const [error, setError] = useState(null)
    const { id } = useParams()
    const getYear = new Date().getFullYear()

    

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(`https://lune-backend-eclm.onrender.com/api/v1/tmdb/movie?query=${id}`)
            if (!response.ok) {
                    const error = await response.json();
                    console.error(`Movie Details fetch failed: ${error.message}`);
                    return;
                    }
            const data = await response.json()
            setMovieDetails(data.data)
            console.log(data)
        } catch (error) {
            setError(error.message)
            console.log('Error fetching movie data', error);
        }
    }
    useEffect(() => {
        console.log(id)
        fetchMovieDetails()
    }, [id])

    return (
        <div>Hi</div>
        // <div className="relative scrollbar-hide
        //                 bg-lightBg text-lightTextMain h-screen dark:bg-darkBg dark:text-darkTextMain box-border font-roboto overflow-y-auto">
        //         <div className="flex flex-col gap-2 justify-center items-center">
                
        //         <header className=" w-full mt-0 pt-0">
        //             <h1 className="w-4 ml-3 pr-6 p-2 text-3xl bg-darkBg text-darkTextMain dark:bg-lightBg dark:text-lightTextMain translate-y-7 md:text-6xl rounded-t-full font-bold border-none md:bg-darkBg md:text-darkTextMain md:dark:bg-lightBg md:dark:text-lightTextMain md:w-12 md:pb-0">L</h1>
        //             <div className="translate-y-[-40px] translate-x-10 md:ml-16 p-3 md:translate-y-[-40px] md:translate-x-0"><h1 className="text-3xl tracking-widest font-bold">LUNE</h1> <p>Discover and save movies worth your time.</p></div>
        //             <div>
        //             </div>
        //             <NavMenu/>
        //             <SearchBar/>
        //         </header>

        //         <section id="hero" className="mt-5 py-2 px-4 relative w-full ">
        //             <div id="heroBlock" className="py-2 px-4 h-[17rem] md:h-[50rem]">
        //             </div>
        //         </section>
                
        //         <section id="genre" className="mt-5">
        //             <div className="flex flex-wrap gap-3 py-2 px-4 justify-start md:gap-5 ">
        //                 {genres.map((genre, index) => (
        //                     <Link to={`/genre/${genre.code}`} key={index} className="w-fit rounded-md py-1 px-2 font-medium text-white
        //             bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40"><p>{`${genre.genre}`}</p></Link>
        //                 ))}
        //             </div>
        //         </section>

        //         <section className="block mt-5 mx-3">
        //         <h1 className="text-2xl font-semibold tracking-widest md:text-3xl text-center">TRENDING MOVIES</h1>
        //             {<HorizontalScroll sectionApi={trendingMovies}/>}
        //             {trendingMoviesError && <button className="w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 text-center mt-5" onClick={() => fetchTrendingMovies()}>Server error, click to retry</button>}
        //             </section>

        //         <section className="block mt-5 mx-3">
        //             <h1 className="text-2xl font-semibold tracking-widest md:text-3xl text-center">TOP RATED MOVIES</h1>
        //             {<HorizontalScroll sectionApi={topRatedMovies}/>}
        //             {topRatedMoviesError && <button className="w-fit rounded-md py-1 px-2 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 mt-5 text-center" onClick={() => fetchTopRatedMovies()}>Server error, click to retry</button>}
        //             </section>

        //             <footer className="flex flex-col gap-3 justify-center items-center text-sm text-lightTextMuted dark:text-darkTextMuted">
        //                 <p className="text-center">Data provided by <a href="https://www.themoviedb.org/" className="underline hover:text-lightTextMuted">TMBD</a>
        //                 </p>
        //                 <p className="text-center">&copy;{getYear} Lune. All rights reserved.</p>
        //             </footer>
        //         </div>
        //     </div>
    )
}

export default MovieDetails;