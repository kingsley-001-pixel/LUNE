import jwt from "jsonwebtoken"

const authmiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message: "No token provided"})
        }

        const token = authHeader.split(" ")[1]

        const decodedInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decodedInfo;
        next()
    } catch (error) {
        return res.status(500).json({message: "Invalid token or expired token"})
    }
}

export default authmiddleware;