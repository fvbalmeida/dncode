const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret = process.env.JWT_SECRET

const User = require("../models/userModel")

const registerUser = async (req, res) => {
    const { name, cpf, password, kindOfUser } = req.body

    try {
        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            cpf,
            password: hash,
            kindOfUser
        })

        const maxAge = 3 * 60 * 60
        const token = jwt.sign({ name, cpf, kindOfUser }, jwtSecret, { expiresIn: maxAge })

        return res
            .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
            .status(201).json({ message: "User successfully created", user})

    } catch (error) {
        res.status(401).json({ message: "An error occurred", error: error.message })
    }
}

module.exports = { registerUser }