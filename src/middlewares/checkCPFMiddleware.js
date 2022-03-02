const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const User = require('../models/userModel')

const checkCPF = async (req, res, next) => {
    const { cpf } = req.body
    const token = req.cookies.jwt

    if (cpf.length !== 11)
        return res.status(400).json({ message: "CPF must have 11 digits." })

    try {
        const user = await User.find({ cpf })

        if (!user)
            return res.status(400).json({ message: "Invalid CPF" })

        else if (!token)
            return res.status(401).json({ message: "Unauthorized" })

        const decodedToken = jwt.verify(token, jwtSecret)

        if (!decodedToken)
            return res.status(401).json({ message: "Unauthorized" })

        else if (decodedToken.cpf !== cpf)
            return res.status(401).json({ message: "Unauthorized" })

        else
            next()

    } catch (error) {
        return res.status(400).json({ message: "An error occurred", error: error.message })
    }
}


module.exports = { checkCPF }