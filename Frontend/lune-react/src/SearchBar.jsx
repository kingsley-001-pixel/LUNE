import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
function SearchBar() {

    const [inputedMovieName, setInputedMovieName] = useState('')
    
    return (
        <div id="searchDiv" className="flex items-center justify-center w-full px-4 py-2">
                    <input onChange={(e) => setInputedMovieName(e.target.value.trim())} type="search" className="w-full py-2 px-4 rounded-full bg-lightCard border border-lightBorder text-lightTextMain sticky top-0 placeholder:text-lightTextMuted
                    dark:bg-darkCard dark:border-darkBorder dark:text-darkTextMain dark:placeholder:text-darkTextMuted
                    focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent h-9" id="searchBar" placeholder="Search movies by name..."/>
                    <Link to={`/search/${inputedMovieName}`} className="ml-3 text-xl">{<FaSearch/>}</Link>
                    </div>
    )
}

export default SearchBar;