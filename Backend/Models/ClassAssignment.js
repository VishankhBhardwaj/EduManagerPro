const mongoose = require('mongoose');

const ClassAssignment = new mongoose.Schema({
    schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'TeacherSchedule', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    date: { type: Date, default: Date.now },
    assignments:[
        {
            file: { type: String, required: true },
            description: { type: String }
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('classassignment',ClassAssignment);