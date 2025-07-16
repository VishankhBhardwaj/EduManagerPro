const TeacherScheduleModel = require('../Models/TeacherSchedule');
const Teacher = require('../Models/Teacher');
const studentModel = require('../Models/Student');
exports.Schedule = async (req, res) => {
    const { Day, SubjectName, StartTime, EndTime } = req.body;
    const Teacher = req.userId;
    if (!Day || !SubjectName || !StartTime || !EndTime) {
        return res.status(400).json({ msg: "All fields Required" });
    } else {
        try {
            const schedule = new TeacherScheduleModel({
                Teacher: Teacher,
                Day: Day,
                SubjectName: SubjectName,
                StartTime: StartTime,
                EndTime: EndTime
            })
            await schedule.save();
            return res.status(200).json({ msg: "Schedule added successfully" });
        } catch (err) {
            return res.status(500).json({
                msg: 'Server Error',
                err: err.message || err
            })
        }
    }
}
exports.AllSchedule = async (req, res) => {
    try {
        const data = await TeacherScheduleModel.find().populate('Teacher','-Password');
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error',
            err: err.message || err
        });
    }
}

exports.teacherData = async (req, res) => {
    const teacherId = req.userId;
    try {
        const data = await Teacher.findById(teacherId).select('-Password');
        if (!data) {
            return res.status(404).json({ msg: "Teacher not found" });
        }
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error',
            err: err.message || err
        });
    }
}
exports.UpdateTeacherData = async (req, res) => {
    const teacherId = req.userId;
    const { FullName, Email, PhoneNumber, Department, Qualification, Experience, SubjectsTeaching } = req.body;
    if (!FullName || !Email || !PhoneNumber || !Department || !Qualification || !Experience || !SubjectsTeaching) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            {
                FullName,
                Email,
                PhoneNumber,
                Department,
                Qualification,
                Experience,
                SubjectsTeaching
            },
            { new: true }
        );
        if (!updatedTeacher) {
            return res.status(404).json({ msg: "Teacher not found" });
        }
        if (updatedTeacher) {
            updatedTeacher.Password = undefined;
        }
        return res.status(200).json({ msg: "Teacher data updated successfully", data: updatedTeacher });
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error',
            err: err.message || err
        });
    }
}
exports.studentData = async (req, res) => {
    const studentId = req.userId;
    try {
        const data = await studentModel.findById(studentId).select('-Password');
        if (!data) {
            return res.status(404).json({ msg: "Student not found" });
        }
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error',
            err: err.message || err
        });
    }
}
exports.UpdateStudentData = async (req, res) => {
    const studentId = req.userId;
    const { FullName, Email, PhoneNumber, DOB, GuardianName, Grade, Address } = req.body;
    if (!FullName || !Email || !PhoneNumber || !DOB || !GuardianName || !Grade || !Address) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(
            studentId,
            {
                FullName,
                Email,
                PhoneNumber,
                DOB,
                GuardianName,
                Grade,
                Address
            },
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ msg: "Student not found" });
        }
        if (updatedStudent) {
            updatedStudent.Password = undefined;
        }
        return res.status(200).json({ msg: "Student data updated successfully", data: updatedStudent });
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error',
            err: err.message || err
        });
    }
}