const express = require('express')

const publicRoutes = express.Router()

// IMPORTING MIDDLEWARES
const { registerMiddleware } = require('../middlewares/registerUserMiddleware')
const { verifyLoginData } = require('../middlewares/loginMiddleware')

// IMPORTING CONTROLLERS
const { registerUser } = require('../controllers/registerUserController')
const { login } = require('../controllers/loginController')


publicRoutes.post('/register', registerMiddleware, registerUser)
publicRoutes.post('/session', verifyLoginData, login)


module.exports = publicRoutes