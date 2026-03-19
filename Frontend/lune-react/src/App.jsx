import { Routes, Route } from "react-router-dom"
import './App.css'
import Signup from './signup.jsx'
import Login from './login.jsx'
import Dashboard from "./Dashboard.jsx"
import Welcome from "./welcome.jsx"
import GenrePage from "./GenrePage.jsx"
import Search from "./Search.jsx"
import Favorites from "./Favorites.jsx"
import Watchlist from "./Watchlist.jsx"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/genre/:genre" element={<GenrePage/>} />
      <Route path="/search/:movieName" element={<Search/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/favorites" element={<Favorites/>} />
      <Route path="/watchlist" element={<Watchlist/>} />
    </Routes>
  )
}

export default App
