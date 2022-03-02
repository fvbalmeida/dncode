const jwtSecret = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")

const User = require('../models/userModel')

const login = async (req, res) => {
    const { cpf } = req.body

    const user = await User.findOne({ cpf })
    const kindOfUser = user.kindOfUser

    const maxAge = 3 * 60 * 60

    try {
        const token = jwt.sign({ cpf, kindOfUser }, jwtSecret, { expiresIn: maxAge })

        if (!token)
            return res.status(400).json({ message: "Failed to authenticate" })

        else
            return res
                .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
                .status(200).json({ message: `Successfully logged in. Welcome, ${user.name}!` })

    } catch (error) {
        return res.status(400).json({ message: "An error occurred", error: error.message })
    }
}


module.exports = { login }
