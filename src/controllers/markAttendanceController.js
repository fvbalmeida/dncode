const Attendance = require('../models/attendanceModel')
const User = require('../models/userModel')


const markAttendance = async (req, res) => {
    const { cpf } = req.body

    const user = await User.findOne({ cpf })

    try {
        const attendance = await Attendance.create({
            cpf
        })

        if (!attendance)
            return res.status(400).json({ message: "Error. Could not mark attendance!" })

        const update = await User.findByIdAndUpdate(
            user._id,
            { $push: { attendances: attendance } },
            { new: true, useFindAndModify: false }
        );

        if (!update)
            return res.status(400).json({ message: "Error. Could not mark attendance!" })

        else
            return res.status(201).json({ message: "Attendance successfully registered", attendance})

    } catch (error) {
        return res.status(400).json({ message: "An error occurred", error: error.message })
    }
}

module.exports = { markAttendance }