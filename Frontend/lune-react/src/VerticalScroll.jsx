
function VerticalScroll({Movies}) {
    
    return(
        <div className="grid grid-cols-2 gap-12 py-2 px-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 md:mr-5">
                    {Movies.sort((b,a) => a.vote_average - b.vote_average).map((movie, index) => (
                        <div key={index} className="bg-lightCard  overflow-y-auto overflow-x-hidden transition h-80 text-lightTextMuted w-40 hover:scale-105 scrollbar-hide dark:bg-darkCard dark:text-darkTextMuted rounded rounded-b-lg">
                            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` :  `https://via.placeholder.com/300x450?text=No+Image`} alt={movie.title} className="rounded-lg w-full h-auto"/>
                            <div id="movieContent" className=" px-2 py-4">
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