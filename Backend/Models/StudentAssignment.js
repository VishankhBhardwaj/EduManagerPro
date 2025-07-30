const mongoose = require('mongoose')

const studentAssignmentSchema = new mongoose.Schema({
    schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'TeacherSchedule', required: true },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
        required:true
    },
    assignments:[
        {
            file: { type: String, required: true },
            description: { type: String }
        }
    ],
    marks:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports = mongoose.model('studentAssignment',studentAssignmentSchema);