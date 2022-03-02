const bcrypt = require('bcryptjs')

const User = require("../models/userModel")


const verifyLoginData = async (req, res, next) => {
    const { cpf, password } = req.body

    if (!cpf || !password)
        return res.status(400).json({ message: "Your authentication information is incorrect." })

    try {
        const user = await User.findOne({ cpf })

        if (!user)
            return res.status(400).json({ message: "Your authentication information is incorrect." })

        const result = await bcrypt.compare(password, user.password)

        if (!result)
            return res.status(400).json({ message: "Your authentication information is incorrect." })

        else
            next()

    } catch (error) {
        res.status(400).json({ message: "An error occurred", error: error.message })
    }
}


module.exports = { verifyLoginData }