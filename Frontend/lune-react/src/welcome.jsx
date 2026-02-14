import { useNavigate } from "react-router-dom";
function Welcome() {
    const navigate = useNavigate()
    setTimeout(() => {
        navigate('/dashboard')
    }, 5000);
    
    return(
        <div className="bg-blue-700 text-white flex justify-center items-center h-screen">
            <h1 className="text-9xl font-serif font-extrabold shadow-4xl shadow-white">Welcome to LUNE</h1>
            <br />
            <br />
            <h2 className="text-6xl font-roboto font-bold">Home of Movies</h2>

        </div>
    )
}

export default Welcome;