import { FaEye, FaEyeSlash} from "react-icons/fa"
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    // TOGGLE THEME SETUP
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => {
        setIsDark(!isDark)

        if(!isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove('dark')
        }

        console.log(document.documentElement.classList);
    }
    


    // PASSWORD VISIBILITY
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    function handleShowPassword() {
        setShowPassword(sp => !showPassword)
    }
    function handleShowConfirmPassword() {
        setShowConfirmPassword(!showConfirmPassword)
    }

    //  GETTING FORM INPUTS
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    // SETTING LOADNG, ERROR AND SUCCESS MESSAGES
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)


    
    // FORM VALIDATION
    const handleRegister = async (e) => {
        // PREVENT RELOADING PAGE
            e.preventDefault();

        //  CHECKING STAT OF USER'S INPUT
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage("All fields are required!")
            return;
        }
        if ( !username ) { 
            setErrorMessage("Username is required!")
            return;
        }
        if ( !email ) { 
            setErrorMessage("Email is required!")
            return;
        }
        
        //  COMPARING PASSWORDS
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email.trim())) {
            setErrorMessage("Enter a valid email!")
            return;
        }
        
        //  COMPARING PASSWORDS
        if ( !password ) { 
            setErrorMessage("Password is required!")
            return;
        }
        if (!confirmPassword) {
            setErrorMessage("Re-enter your password!")
            return;
        }
        if (password.length < 8 || confirmPassword.length < 8) {
            setErrorMessage("Password is too short!")
            return;
        }
        if (password !== confirmPassword ) {
            setErrorMessage("Passwords do not match!")
            return;
        }

        // SUBMISSION OF FORM DATA TO MY DATABASE FOR AUTHENTICATION
        try {
            setIsSubmitting(true)
            // SENDING REQUEST
            const registrationResponse = await fetch ("http://localhost:4000/api/v1/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        })
        const data = await registrationResponse.json()
        setIsSubmitting(false)

        // CHECKING RESPONSE AND RETURNING MESSAGE
        if (!registrationResponse.ok) {
            console.log(data.message)
            setErrorMessage(data.message)
        } else {
            setSuccessMessage(data.message)
            setUsername("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setErrorMessage("")
            navigate('/login')
        }
        } catch (error) {
            console.log("Internal server error. Try again later.")
        }
        //  CLEARING USER'S INPUT AFTER SUCCESSFUL VALIDATION
            
    }

    document.addEventListener('keypress', (e) => {
        if (e.keyCode === "Enter") {
            handleRegister()
        }
    })

    const navigateToLoginPage = () => {
        navigate('/login');
    }


    return (
        // SIGN UP PAGE CONTAINER
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
                    <h1 className="text-center py-3 font-semibold md:text-lg ">Create Your Lune Account</h1>

                    {/* FORM CONTAINER */}
                    <div className="box-border md:border-b-2 md:border-darkBg md:w-[556px] md:border-r-1 md:pr-3 md:rounded-r-3xl text-center dark:md:border-lightBg">
                <form className="space-y-7 p-2 md:space-y-8">
                    {/* USERNAME INPUT */}
                    <input value={username} onChange={handleUsername} className="w-full rounded-md px-4 py-3 bg-lightCard border border-lightBorder text-lightTextMain placeholder:text-lightTextMuted
                    dark:bg-darkCard dark:border-darkBorder dark:text-darkTextMain dark:placeholder:text-darkTextMuted
                    focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent h-9" 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="Enter your username" />

                    {/* EMAIL INPUT */}
                    <input value={email} onChange={handleEmail} className="w-full rounded-md px-4 py-3 bg-lightCard border border-lightBorder text-lightTextMain placeholder:text-lightTextMuted
                    dark:bg-darkCard dark:border-darkBorder dark:text-darkTextMain dark:placeholder:text-darkTextMuted
                    focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent h-9" 
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
                        className="w-full rounded-md px-4 py-3 bg-lightCard border border-lightBorder text-lightTextMain placeholder:text-lightTextMuted
                        dark:bg-darkCard dark:border-darkBorder dark:text-darkTextMain dark:placeholder:text-darkTextMuted
                        focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent h-9" 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        id="password" 
                        placeholder="Create a password" />
                        <p className="text-left text-sm text-accent/70 font-light ml-4 mt-0">Password should be atleast 8 characters long</p>
                        {/* SHOW/HIDE PASSWORD BUTTON */}
                        <button 
                        type="button" 
                        onClick={handleShowPassword} 
                        className="absolute text-lg right-5 top-2 text-lightTextMuted/60 hover:text-lightTextMuted " >{showPassword ? <FaEyeSlash/> : <FaEye/>}</button>
                    </div>

                    {/* CONFIRM PASSWORD CONTAINER */}
                    <div className="relative ">
                    {/* CONFIRM PASSWORD */}
                    <input 
                        value={confirmPassword} 
                        onChange={handleConfirmPassword} 
                        className="w-full rounded-md px-4 py-3 bg-lightCard border border-lightBorder text-lightTextMain placeholder:text-lightTextMuted
                        dark:bg-darkCard dark:border-darkBorder dark:text-darkTextMain dark:placeholder:text-darkTextMuted
                        focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent h-9" 
                        type={showConfirmPassword ? "text" : "password"} 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        placeholder="Re-enter your password" />
                    <p className="text-left text-sm text-accent/70 font-light ml-4 mt-0">Confirm your password</p>
                    {/* SHOW/HIDE "CONFIRM PASSWORD" BUTTON */}
                    <button 
                    type="button" 
                    onClick={handleShowConfirmPassword} 
                    className="absolute text-lg right-5 top-2 text-lightTextMuted/60 hover:text-lightTextMuted" >{ showConfirmPassword ? <FaEyeSlash/> : <FaEye/> }</button>
                    </div>
                    {/* ERROR MESSAGE */}
                    {errorMessage && <p className="text-sm text-error mb-2">{errorMessage}</p>}
                    {/* SUCCESS MESSAGE */}
                    {successMessage && <p className="text-sm text-success mb-2">{successMessage}</p>}

                    {/* FORM SUBMIT BUTTON */}
                    <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    onClick={handleRegister}  
                    className="w-full rounded-md py-3 font-medium text-white
                    bg-primary hover:bg-primaryHover transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/40" >{isSubmitting ? "Creating account..." : "Create Account"}</button>

                    {/* LOGIN-REDIRECT BUTTON */}
                    <button 
                    type="button" onClick={navigateToLoginPage}
                    className="w-full rounded-md py-3 font-medium text-white
                    bg-primary hover:bg-primaryHover transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/40">Already have an account? Log in</button>
                </form>
                {/* FOOTER */}
                <footer className="mt-2 mb-4">
                    <p>By creating an account, you agree to our <span className="font-normal cursor-pointer">Terms of Service and Privacy Policy.</span></p>
                </footer>
                </div>
                </div>
                </div>
        </div>
    )
}

export default Signup;