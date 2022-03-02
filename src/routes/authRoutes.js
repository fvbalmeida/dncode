const express = require('express')

const authRoutes = express.Router()

// IMPORTING MIDDLEWARES
const { checkCPF } = require('../middlewares/checkCPFMiddleware')
const { checkAuth } = require('../middlewares/checkAuthMiddleware')

// IMPORTING CONTROLLERS
const { markAttendance } = require('../controllers/markAttendanceController')
const { getAllAttendances } = require('../controllers/getAllAttendancesController')
const { getAttendanceByDate } = require('../controllers/getAttendanceByDateController')
const { getAttendanceById } = require('../controllers/getAttendanceByIdController')
const { updateAttendance } = require('../controllers/updateAttendanceController')
const { deleteAttendance } = require('../controllers/deleteAttendanceController')


authRoutes.post('/auth/markattendance', checkCPF, markAttendance)
authRoutes.get('/auth/attendance', checkAuth, getAllAttendances)
authRoutes.get('/auth/attendance/date', checkAuth, getAttendanceByDate)
authRoutes.get('/auth/attendance/:id', checkAuth, getAttendanceById)
authRoutes.put('/auth/attendance/:id', checkAuth, updateAttendance)
authRoutes.delete('/auth/attendance/:id', checkAuth, deleteAttendance)


module.exports = authRoutes