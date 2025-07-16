const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid phone number'],
  },
  Email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  Password: {
    type: String,
    required: true,
    minlength: 6,
  },
  Gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'],
  },
  ProfilePic: {
    type: String,
    default: 'https://www.w3schools.com/howto/img_avatar.png',
  },
  Department: {
    type: String,
    default: '',
  },
  Qualification: {
    type: String,
    default: '',
  },
  Experience: {
    type: String,
    default: '',
  },
  SubjectsTeaching: {
    type: [String], 
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model("Teacher", teacherSchema);
