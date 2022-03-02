const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const checkAuth = (req, res, next) => {
    const token = req.cookies.jwt

    try {
        if (!token)
            return res.status(401).json({ message: "Unauthorized" })

        const decodedToken = jwt.verify(token, jwtSecret)

        if (!decodedToken)
            return res.status(401).json({ message: "Unauthorized" })

        else if (decodedToken.kindOfUser !== "Admin")
            return res.status(401).json({ message: "Unauthorized" })

        else
            next()

    } catch (error) {
        return res.status(400).json({ message: "An error occurred", error: error.message })
    }
}

module.exports = { checkAuth }