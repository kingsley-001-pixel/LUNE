import { FaBars, FaSignOutAlt, FaTrash } from "react-icons/fa";
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

    return (
        <>        <div id="navBtn" className="show cursor-pointer w-fit rounded-md py-1 px-2 absolute top-7 right-3 font-medium text-white bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40 sm:hidden ml-[350px]">
                                    <FaBars/>
                                </div>
                                <ul id="navList" className=" absolute right-0 mt-[-80px] w-40 text-lightTextMain/50 dark:text-darkTextMain/50 bg-lightBg dark:bg-darkBg rounded-md shadow-lg py-1 z-20 space-y-1 sm:z-0 sm:bg-none sm:absolute sm:shadow-none sm:flex sm:gap-5 sm:space-y-0 sm:w-auto sm:mt-0 sm:top-7 sm:right-5 hidden">
                                        <li><button onClick={toggleTheme} className=" cursor-pointer inline-flex w-full justify-center md:hover:bg-none hover:text-lightTextMain dark:hover:text-darkTextMain">Theme {isDark ? (<HiOutlineSun color="#f6f7fb" size={26}className="ml-2"/>) : (<HiOutlineMoon color="#0b0f1a" size={26}className="ml-2"/>)}</button>
                            </li>
                                        <li><button onClick={handleLogout} className="  text-red-400 cursor-pointer inline-flex hover:text-red-600 w-full justify-center">Log Out<FaSignOutAlt size={23} className="ml-2"/></button></li>
                                        <li><button onClick={handleDeleteAccount} className="text-red-400 cursor-pointer inline-flex hover:text-red-600 w-full justify-center">Delete Account<FaTrash size={23} className="ml-2"/></button></li>
                                    </ul>
                                    </>
    )
}

export default NavMenu;