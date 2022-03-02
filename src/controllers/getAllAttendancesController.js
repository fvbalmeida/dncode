const Attendance = require('../models/attendanceModel')

const getAllAttendances = async (req, res) => {

    try {
        const attendance = await Attendance.find()

        if (attendance.length === 0)
            return res.status(404).json({ message: "Sorry. Nothing to show here!" })
        else
            return res.status(200).json({ attendance })


    } catch (error) {
        return res.status(400).json({ message: "error", error: error.message })
    }
}

module.exports = { getAllAttendances }