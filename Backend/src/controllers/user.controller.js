import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if ( !username || !email || !password ) { 
            return res.status(400).json({message: "All fields are required."})
        }

        const existingUser = await User.findOne({email: email.toLowerCase()})

        if (existingUser) {
            return res.status(400).json({message: "Account already exists"})
        }

        const user = await User.create({ username, email: email.toLowerCase(), password})
        return res.status(201).json({message: "Account created successfully", user: {
                                                                                        id: user._id,
                                                                                        username: user.username,
                                                                                        email: user.email,
                                                                                    }})
    } catch (error) {
        return res.status(500).json({message: "Server error, try again later.", error: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "Both fields are required."})
        }

        const user = await User.findOne({email: email.toLowerCase()})

        if(!user) {
            return res.status(400).json({message: "Account does not exist."})
        }

        const isMatched = await user.comparePassword(password)

        if (!isMatched) {
            return res.status(400).json({message: "Invalid credentials!"})
        }

        const token = jwt.sign(
            {id: user._id.toString()},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "7d"}
        )

        return res.status(201).json({message: "Login succesful", token, user: {
                                                                            id: user._id,
                                                                            username: user.username,
                                                                            email: user.email,
                                                                        }})
    } catch (error) {
        return res.status(500).json({message: "Server error", error: error.message })
    }
}

export {
    registerUser,
    loginUser
};