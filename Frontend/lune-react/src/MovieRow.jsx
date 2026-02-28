import { useEffect, useState } from "react"
import HorizontalScroll from "./HorizontalScroll"

function MovieRow({title, fetchUrl}) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(fetchUrl, {
                method: "GET"})
            if(!response.ok) {
                console.log('Server error');
                setError(true)
                setLoading(false)
                return;
            }
            const data = await response.json()
            setMovies(data.data.results)
            setError(false)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [fetchUrl])

    return(
        
        <div>
            <h2 className="text-2xl font-semibold tracking-wide md:text-3xl text-left ml-2 mt-4 mb-[-10px]">{title}</h2>
            {<HorizontalScroll sectionApi={movies}/>}
        {error && <button className="w-fit rounded-md py-1 px-2 font-medium text-white mt-5 bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 text-center" onClick={() => fetchData()}>Server error, click to retry</button>}
        
        </div>
    )
}

export default MovieRow