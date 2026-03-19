import { FaBars, FaSignOutAlt, FaTrash, FaHeart, FaBookmark, FaHome } from "react-icons/fa";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavMenu() {
    const navigate = useNavigate()
    // THEME TOGGLE
    const [isDark, setIsDark] = useState(false)
    const toggleTheme = () => {
        setIsDark(!isDark)
        if(!isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false) 

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            console.log('null')
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
        }
    }, [])

        const handleLogout = () => {
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            navigate('/login')
        }
    
        const navbarToggle = () => {
            const navBtn = document.getElementById("navBtn")
            const navList = document.getElementById("navList")
            navBtn.addEventListener("click", () => {
                navList.classList.toggle("hidden")
                if (!navList.classList.contains("hidden")) {
                    document.addEventListener("click", (e) => {
                        if (!navBtn.contains(e.target) && !navList.contains(e.target)) {
                            navList.classList.add("hidden")
                        }
                    })
                }
            })
        }
    
        useEffect(() => {
            navbarToggle()
        }, [])

        const handleDeleteAccount = async () => {
            const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.")
            if (confirmDelete) {
                try {
                    const response = await fetch('http://localhost:4000/api/v1/user/delete', {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    })

                    if (response.ok) {
                        localStorage.removeItem("token")
                        localStorage.removeItem("username")
                        navigate('/login')
                    } else {
                        const errorData = await response.json()
                        alert(errorData.message || "Failed to delete account.")
                    }
                } catch (error) {
                    console.error("Error deleting account:", error)
                    alert("An error occurred while deleting your account.")
                }
            }
        }

        const handleSignUp = () => {
            navigate('/signup')
        }

        const handleLogIn = () => {
            navigate('/login')
        }

        const handleFavorites = () => {
            navigate('/favorites')
        }

        const handleWatchlist = () => {
            navigate('/watchlist')
        }

        const handleMenu = () => {
            navigate('/dashboard')
        }
    return (
        <>
        <div id="navBtn" className="show cursor-pointer w-fit rounded-md py-1 px-2 absolute top-7 right-3 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 sm:hidden ml-[350px]">
            <FaBars/>
        </div>
            <ul id="navList" className=" absolute right-0 top-0 border w-fit py-4 px-4 text-lightTextMain/50 dark:text-darkTextMain/50 bg-lightBg dark:bg-darkBg rounded-md shadow-l z-20 space-y-1 sm:z-0 sm:bg-none sm:absolute sm:shadow-none sm:flex sm:gap-5 sm:space-y-0 sm:w-auto sm:mt-0 sm:top-7 sm:right-5 hidden">
                <li><button onClick={handleMenu} className="cursor-pointer inline-flex w-full justify-center md:hover:bg-none hover:text-lightTextMain dark:hover:text-darkTextMain">Menu <FaHome size={20} className="ml-2"/></button></li>

                <li><button onClick={toggleTheme} className=" cursor-pointer inline-flex w-full justify-center md:hover:bg-none hover:text-lightTextMain dark:hover:text-darkTextMain">Theme {isDark ? (<HiOutlineSun color="#f6f7fb" size={20} className="ml-2"/>) : (<HiOutlineMoon color="#0b0f1a" size={26}className="ml-2"/>)}</button>
                </li>
                {isLoggedIn ? 
                <>
                {/* FAVORITES */}
                <li><button onClick={handleFavorites} className="cursor-pointer inline-flex w-full justify-center md:hover:bg-none hover:text-lightTextMain dark:hover:text-darkTextMain">Favorites <FaHeart size={20} className="ml-2"/></button></li>

                {/* WATCHLIST BUTTON */}
                <li><button onClick={handleWatchlist} className="cursor-pointer inline-flex w-full justify-center md:hover:bg-none hover:text-lightTextMain dark:hover:text-darkTextMain">Watchlist <FaBookmark size={20} className="ml-2"/></button></li>

                {/* LOGOOUT BUTTON */}
                <li><button onClick={handleLogout} className="  text-red-400 cursor-pointer inline-flex hover:text-red-600 w-full justify-center">Log Out<FaSignOutAlt size={20} className="ml-2"/></button></li>
                <li><button onClick={handleDeleteAccount} className="text-red-400 cursor-pointer inline-flex hover:text-red-600 w-full justify-center">Delete Account<FaTrash size={20} className="ml-2"/></button></li></> 
                : // ELSE 
                <>
                {/* SIGN UP BUTTON */}
                <li><button onClick={handleSignUp} className="cursor-pointer inline-flex w-full justify-center md:hover:bg-none hover:text-lightTextMain dark:hover:text-darkTextMain">Sign Up</button></li>

                {/* LOG IN BUTTON */}
                <li><button onClick={handleLogIn} className="cursor-pointer inline-flex w-full justify-center md:hover:bg-none hover:text-lightTextMain dark:hover:text-darkTextMain">Log In</button></li>
                </> }
            </ul>
        </>
    )
}

export default NavMenu;