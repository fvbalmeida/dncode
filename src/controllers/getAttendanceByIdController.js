const Attendance = require('../models/attendanceModel')

const getAttendanceById = async (req, res) => {
    const id = req.params.id

    if (!id)
        return res.status(400).json({ message: "ID required" })

    try {
        const attendance = await Attendance.findById(id)

        if (!attendance)
            return res.status(404).json({ message: "Sorry. Nothing to show here! ID not found." })
        else
            return res.status(200).json({ attendance })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

module.exports = { getAttendanceById }