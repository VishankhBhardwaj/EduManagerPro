const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, 'Please provide a valid phone number']
    },
    Email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    },
    Gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    ProfilePic: {
        type: String,
        default: 'https://www.w3schools.com/howto/img_avatar.png'
    }
}, { timestamps: true })

module.exports = mongoose.model("student", studentSchema);