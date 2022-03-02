const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name: {
        type: String,
        validate: [
            /^[a-zA-Z]{2,}$/,
            "Special characters not allowed."
        ],
        required: true
    },
    cpf: {
        type: String,
        validate: [
            /^[0-9]{11}$/,
            "Only numbers allowed."
        ],
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [
            6,
            "Password must contain a minimum of 6 characters"
        ],
    },
    kindOfUser: {
        type: String,
        required: true,
        enum: {
            values: ["Employee"],
        },
    },
    attendances: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendance",
        },
    ],
})

module.exports = mongoose.model("user", User)
