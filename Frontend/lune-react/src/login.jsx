import { FaEye, FaEyeSlash} from "react-icons/fa"
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate()
    // TOGGLE THEME FUNCTION
    const [isDark, setIsDark] = useState(false)
    const toggleTheme = () => {
        setIsDark(!isDark)

        if(!isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove('dark')
        }

        console.log(document.documentElement.classList);
    }

    // GETTING CURRENT YEAR
    const getYear = new Date().getFullYear();
    
    // PASSWORD VISIBILITY
    const [showPassword, setShowPassword] = useState(false)
    function handleShowPassword() {
        setShowPassword(!showPassword)
    }

        //  GETTING FORM INPUTS
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    
    // SETTING LOADNG, ERROR AND SUCCESS MESSAGES
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const handleLogin = async (e) => {
        // PREVENT RELOADING PAGE
            e.preventDefault();

        //  CHECKING STAT OF USER'S INPUT
        if  (!email || !password) {
            setErrorMessage("All fields are required")
            return;
        }
        if ( !email ) { 
            setErrorMessage("Email is required")
            return;
        }
        if ( !password ) { 
            setErrorMessage("Password is required.")
            return;
        }
        
        //  COMPARING PASSWORDS
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email.trim())) {
            setErrorMessage("Enter a valid email")
            return;
        }

        // SUBMISSION OF FORM DATA TO MY DATABASE FOR AUTHENTICATION
            setIsLoggingIn(true)
            // SENDING REQUEST
            const registrationResponse = await fetch ("http://localhost:4000/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        const data = await registrationResponse.json()
        setIsLoggingIn(false)
        // SAVING TOKEN TO LOCAL STORAGE
        
        // CHECKING RESPONSE AND RETURNING MESSAGE
        if (!registrationResponse.ok) {
            setErrorMessage(data.message)
        } else {
            localStorage.setItem("token", data.token)
            setSuccessMessage(data.message)
            navigate('/dashboard')
            setUsername("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setErrorMessage("")
            
        }
    
    }

    //  ENABLING ENTER KEY TO SIGN UP
    document.addEventListener('keypress', (e) => {
        if (e.keyCode === "Enter") {
            handleLogin()
        }
    })

    // NAVIGATE TO SIGNUP PAGE FUNCTION
    const navigateToSignupPage = () => {
        navigate('/signup')
    };

    return(
        <div className="
                        relative
                        bg-lightBg text-lightTextMain min-h-screen dark:bg-darkBg dark:text-darkTextMain box-border font-roboto overflow-hidden md:flex md:justify-center md:items-center
                        ">
                <div className="flex flex-col gap-3 justify-center items-center p
                md:flex-row md:w-[900px] md:h-[600px] md:my-5 md:text-center">
                {/* HEADER */}
                <header className=" w-full md:w-[344px] md:min-h-full md:p-2 md:rounded-s-3xl mt-0 pt-0 h-24 md:bg-darkBg md:text-darkTextMain md:dark:bg-lightBg md:dark:text-lightTextMain">
                    <h1 className="w-4 ml-3 pr-6 p-2 text-3xl bg-darkBg text-darkTextMain dark:bg-lightBg dark:text-lightTextMain translate-y-7 md:text-5xl rounded-t-full md:w-16 font-bold border-none md:p-4 md:translate-y-48 md:bg-lightBg md:text-lightTextMain md:dark:bg-darkBg md:dark:text-darkTextMain">L</h1>
                    <div className="translate-y-[-40px] ml-12 p-3 md:translate-y-1"><h1 className="text-3xl tracking-widest font-bold md:translate-y-32 md:text-5xl md:ml-8">LUNE</h1> <p className="md:translate-y-40 md:text-lg md:ml-[-40px]">Discover and save movies worth your time.</p></div>
                </header>
                {/* THEME BUTTON */}
                <button type="button" onClick={toggleTheme} className="absolute right-5 top-7 text-red-700 cursor-pointer">{isDark ? (<HiOutlineSun color="#f6f7fb" size={30}/>) : (<HiOutlineMoon color="#0b0f1a" size={30}/>)}</button>

                {/* SUBHEADER */}
                <div className="md:space-y-3 overflow-hidden md:p-4 md:text-center ">
                    <h1 className="md:mt-9 text-center text-2xl py-3 font-semibold md:text-3xl ">Log In To Your Lune Account</h1>

                    {/* FORM CONTAINER */}
                    <div className="box-border w-[490px] md:border-b-2 md:border-darkBg md:w-[556px] md:border-r-1 md:pr-3 md:rounded-r-3xl text-center dark:md:border-lightBg">
                <form className="p-2 md:space-y-8">
                    {/* EMAIL INPUT */}
                    <input value={email} onChange={handleEmail} className="w-80 rounded-md px-4 py-3 mt-4 mb-8 md:mb-0 md:mt-7 md:w-full bg-lightCard border border-lightBorder text-lightTextMain placeholder:text-lightTextMuted
                    dark:bg-darkCard dark:border-darkBorder dark:text-darkTextMain dark:placeholder:text-darkTextMuted
                    focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent h-12" 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Enter your email address" />

                    {/* PASSWORD CONTAINER */}
                    <div className="relative ">
                        {/* PASSWORD INPUT */}
                        <input 
                        value={password} 
                        onChange={handlePassword} 
                        className="w-80 rounded-md px-4 py-3 my-2 mb-14 md:mb-0 bg-lightCard border border-lightBorder text-lightTextMain placeholder:text-lightTextMuted
                        dark:bg-darkCard dark:border-darkBorder dark:text-darkTextMain dark:placeholder:text-darkTextMuted
                        focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent h-12 md:w-full " 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        id="password" 
                        placeholder="Enter your password" />
                        <button 
                        type="button" 
                        onClick={handleShowPassword} 
                        className="absolute text-2xl top-5 right-24 md:right-5 md:top-6 text-lightTextMuted/60 hover:text-lightTextMuted " >{showPassword ? <FaEyeSlash/> : <FaEye/>}</button>
                    </div>
                    {/* ERROR MESSAGE */}
                    {errorMessage && <p className="text-sm text-error mb-2">{errorMessage}</p>}
                    {/* SUCCESS MESSAGE */}
                    {successMessage && <p className="text-sm text-success mb-2">{successMessage}</p>}

                    {/* FORM SUBMIT BUTTON */}
                    <button 
                    type="submit" 
                    disabled={isLoggingIn} 
                    onClick={handleLogin}  
                    className="w-80 rounded-md py-3 font-medium text-white
                    bg-primary hover:bg-primaryHover transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/40 md:w-full" >{isLoggingIn ? "Logging in..." : "Log in"}</button>
                    <br />
                    <br />
                    {/* LOGIN-REDIRECT BUTTON */}
                    <button 
                    type="button" onClick={navigateToSignupPage}
                    className="w-80 rounded-md py-3 font-medium text-white
                    bg-primary hover:bg-primaryHover transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/40 md:w-full">Don't have an account? Sign up</button>
                </form>
                {/* FOOTER */}
                <footer className="mt-14 md:mt-10 md:mb-2">
                    <p>By continuing, you agree to LUNE's terms and privacy policy.</p>
                    <p>&copy;{getYear} Lune. All rights reserved.</p>
                </footer>
                </div>
                </div>
                </div>
        </div>
    )
}

export default Login;