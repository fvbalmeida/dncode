const Attendance = require('../models/attendanceModel')

const deleteAttendance = async (req, res) => {
    const id = req.params.id

    if (!id)
        return res.status(400).json({ message: "ID required!" })

    try {
        const attendance = await Attendance.findByIdAndDelete(id)

        if (!attendance)
            return res.status(404).json({ message: "Faild to delete attendance. ID not found!" })
        else
            return res.status(200).json({ message: "Attendance successfully deleted", attendance })
            

    } catch (error) {
        return res.status(400).json({ message: "An error occurred", error: error.message })
    }
}

module.exports = { deleteAttendance }