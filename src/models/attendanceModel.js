const mongoose = require("mongoose")

const Attendance = new mongoose.Schema({
    cpf: {
        type: String,
        validate: [/^[0-9]{11}$/, "CPF must have 11 numbers"],
        required: true,
    },
    attendanceDate: {
        type: Date,
        default: Date()
    },
})

module.exports = mongoose.model("attendance", Attendance)
