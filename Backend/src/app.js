import express from "express"
import cors from "cors"
import userRoute from "./routes/user.route.js"
import tmdbRoute from "./routes/tmdb.route.js"

const app = express();

app.use(cors({
    origin: [
    "http://localhost:5173",
    "https://lune-9zy7.vercel.app"
    ],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/users', userRoute)
app.use('/api/v1/tmdb', tmdbRoute)

export default app;