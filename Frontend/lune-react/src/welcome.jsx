import { useNavigate } from "react-router-dom";
function Welcome() {
    const navigate = useNavigate()
    setTimeout(() => {
        navigate('/dashboard')
    }, 5000);
    
    return(
        <div className="bg-primary text-white block md:flex justify-center  text-center items-center h-screen">
            <div className="absolute top-[30%] bottom-0 left-0 right-0">

            <h1 className="text-6xl md:text-8xl md:mx-3 font-serif font-extrabold shadow-4xl shadow-white">Welcome to LUNE</h1>
            <br />
            <br />
            <h2 className="text-4xl font-roboto font-bold">Home of Movies</h2>
            </div>

        </div>
    )
}

export default Welcome;