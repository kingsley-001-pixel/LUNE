import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

function BackToTop () {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300)
        }
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <button type="button" onClick={scrollToTop} className="fixed bottom-5 right-5 w-fit rounded-md py-2 px-2 z-99 font-medium text-white
                    bg-primary hover:bg-primaryHover transition focus:outline-none focus:ring-2 focus:ring-accent/40"><FaArrowUp/></button>
    )
}

export default BackToTop;