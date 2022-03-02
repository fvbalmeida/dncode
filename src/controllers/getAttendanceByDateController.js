const Attendance = require('../models/attendanceModel')

const getAttendanceByDate = async (req, res) => {
    const { startDate, endDate } = req.query

    try {
        const attendance = await Attendance.find({
            attendanceDate: {
                $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                $lt: new Date(new Date(endDate).setHours(23, 59, 59))
            }
        })

        if (attendance.length === 0)
            return res.status(404).json({ message: "Sorry. Nothing to show here!" })
        else
            return res.status(200).json({ attendance })

    } catch (error) {
        return res.status(400).json({ message: "error", error: error.message })
    }
}

module.exports = { getAttendanceByDate }