import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

        return (
            <div className="relative w-full max-w-[100vw]">
                        <div className="flex overflow-x-auto whitespace-wrap scrollbar-hide py-4 px-2 gap-4" style={{WebkitOverflowScrolling: 'touch'}} ref={scrollContainerRef}>
                            {sectionApi.sort((b,a) => a.vote_average - b.vote_average).map((movie, index) => (
                    <div key={index} className="bg-lightCard transition snap-start scrollbar-hide text-lightTextMuted overflow-y-auto w-28 h-80 md:w-32 rounded hover:scale-105 rounded-b-lg dark:bg-darkCard dark:text-darkTextMuted flex-shrink-0">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` :  `https://via.placeholder.com/300x450?text=No+Image`} alt={movie.title} className="rounded-lg w-full "/>
                    <div className=" px-2 py-4">
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