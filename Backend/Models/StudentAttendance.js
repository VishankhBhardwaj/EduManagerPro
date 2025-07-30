const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'TeacherSchedule', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { type: Date, default: Date.now },
  records: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
      status: { type: String, enum: ['present', 'absent', 'late'] }
    }
  ]
});

module.exports = mongoose.model('Attendance', attendanceSchema);
