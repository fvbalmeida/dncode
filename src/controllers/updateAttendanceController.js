const Attendance = require('../models/attendanceModel')

const updateAttendance = async (req, res) => {
    const id = req.params.id

    if (!id)
        return res.status(400).json({ message: "ID required!" })

    try {
        const attendance = await Attendance.findByIdAndUpdate(id, req.body)

        if (!attendance)
            return res.status(404).json({ message: "Failed to update attendance. ID not found!" })
        else
            return res.status(200).json({ message: "Attendance successfully updated" })


    } catch (error) {
        return res.status(400).json({ message: "An error occurred", error: error.message })
    }
}


module.exports = { updateAttendance }