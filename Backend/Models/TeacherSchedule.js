const mongoose=require('mongoose');
const teacherScheduleSchema = new mongoose.Schema({
    Teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required:true
    },
    Day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    SubjectName: {
        type: String,
        required: true
    },
    StartTime: {
        type: String,
        required: true
    },
    EndTime: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('TeacherSchedule', teacherScheduleSchema);