import { FaArrowUp } from "react-icons/fa";

function ScrollToTop () {
    
    const scrollToTop = () => {
        // console.log('object');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <button className="fixed bottom-4 right-4 bg-accent text-white p-2 rounded-full" onClick={scrollToTop}>
                                    <FaArrowUp size={22} />
                                </button>
    )
}

export default ScrollToTop;