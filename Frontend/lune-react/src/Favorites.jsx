import NavMenu from "./NavMenu.jsx"
import { HiOutlineUser } from "react-icons/hi2"
import React,{useState, useEffect} from "react"
function Favorites() {
    
    const [movieIds, setMovieIds] = useState([])

    const fetchFavorites = async () => {
        try {
            const response = await fetch("https://lune-backend-eclm.onrender.com/api/v1/users/favorites", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)
        } catch (error) {
            console.log('Error fetching response');
        }
    }

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
                    
                    <NavMenu response={fetchDashboard}/>
                </header>
                </div>
                </div>
    )
}

export default Favorites