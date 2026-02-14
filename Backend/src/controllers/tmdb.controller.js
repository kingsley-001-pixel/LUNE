import { Tmdb } from "../models/tmdb.model.js";
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.TMDB_API_KEY
const apiToken = process.env.TMDB_ACCESS_TOKEN

const getSearch = async (req, res) => {
    try {
        const { moviename, pageNumber } = req.body;

    const apiResponse = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${moviename}&page=${pageNumber}`)

    const data = await apiResponse.json();

    return res.status(201).json({ message: "Success", data})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

const getGenre = async (req, res) => {
    try {
        const { genre, pageNumber } = req.body;

        const apiResponse = await fetch (`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&page=${pageNumber}`)

        const data = await apiResponse.json();

        return res.status(201).json({ message: "Success", data})

    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

const getTopRated = async (req, res) => {
    try {
        const apiResponse = await fetch (`https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&primary_release_date.gte=2025-01-01`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        })

        const data = await apiResponse.json();

        return res.status(201).json({ message: "Success", data})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

const getUpcoming = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0]
        const apiResponse = await fetch (`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${today}&sort_by=primary_release_date.asc&with_original_language=ko`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        })

        const data = await apiResponse.json();

        return res.status(201).json({ message: "Success", data})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

const getTrending = async (req, res) => {
    try {
        const apiResponse = await fetch (`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)

        const data = await apiResponse.json();

        return res.status(201).json({ message: "Success", data})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error.message})
    }
}

const getKorean = async (req, res) => {
    try {
        const apiResponse = await fetch (`https://api.themoviedb.org/3/discover/movie?with_original_language=ko&sort_by=popularity.desc&vote_count.gte=50`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await apiResponse.json();
        return res.status(201).json({ message: "Success", data})
    } catch (error) {
        
    }
}

const getJapanese = async (req, res) => {
    try {
        const apiResponse = await fetch (`https://api.themoviedb.org/3/discover/movie?with_original_language=ja&sort_by=popularity.desc&vote_count.gte=50`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await apiResponse.json();
        return res.status(201).json({ message: "Success", data})
    } catch (error) {
        
    }
}
const getChinese = async (req, res) => {
    try {
        const apiResponse = await fetch (`https://api.themoviedb.org/3/discover/movie?with_original_language=zh&sort_by=popularity.desc&vote_count.gte=50`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await apiResponse.json();
        return res.status(201).json({ message: "Success", data})
    } catch (error) {
        
    }
}
const getWestern = async (req, res) => {
    try {
        const apiResponse = await fetch (`https://api.themoviedb.org/3/discover/movie?with_original_language=en&sort_by=popularity.desc&vote_count.gte=50`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await apiResponse.json();
        return res.status(201).json({ message: "Success", data})
    } catch (error) {
        
    }
}

export {
            getSearch,
            getGenre,
            getTopRated,
            getUpcoming,
            getTrending,
            getKorean,
            getJapanese,
            getChinese,
            getWestern
        }