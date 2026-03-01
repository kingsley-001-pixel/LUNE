import express from "express"
import cors from "cors"
import userRoute from "./routes/user.route.js"
import tmdbRoute from "./routes/tmdb.route.js"

const app = express();

app.use(cors({
    origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",           // dev
      "https://lune-9zy7.vercel.app"    // deployed frontend
    ];
    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
    } else {
        callback(new Error("Not allowed by CORS"));
    }
    },
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]
}));

app.options("/", cors());

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/users', userRoute)
app.use('/api/v1/tmdb', tmdbRoute)

export default app;