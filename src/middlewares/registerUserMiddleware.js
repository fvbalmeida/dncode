const User = require("../models/userModel")

const registerMiddleware = async (req, res, next) => {
    const { name, cpf, password } = req.body

    if (!cpf || !password) {
        return res.status(400).json({ message: "CPF/password cannot be empty!" })
    }

    try {
        const user = await User.findOne({ cpf })

        if (user)
            return res.status(400).json({ message: "User already been used!" })

        else if (name.length < 2)
            return res.status(400).json({ message: "First name required." })

        else if (cpf.length !== 11)
            return res.status(400).json({ message: "CPF must have 11 digits." })

        else if (password.length < 6)
            return res.status(400).json({ message: "Password less than 6 characters." })

        else
            next()

    } catch (error) {
        return res.status(400).json({ message: "error", error: error.message })
    }
}

module.exports = { registerMiddleware }