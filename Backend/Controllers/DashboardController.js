const TeacherScheduleModel = require('../Models/TeacherSchedule');
const Teacher = require('../Models/Teacher');
const studentModel = require('../Models/Student');
const StudyRequest = require('../Models/StudyRequest');
const StudentAttendance = require('../Models/StudentAttendance');
const Assignment = require('../Models/ClassAssignment');
const StudentAssignment = require('../Models/StudentAssignment');
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
        const teacherId = req.userId;
        const data = await TeacherScheduleModel.find({ Teacher: teacherId }).populate('Teacher', '-Password');
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error',
            err: err.message || err
        });
    }
}
exports.AllScheduleStudent = async (req, res) => {
    try {
        const teacherIds = [];
        const result = [];
        const studentId = req.userId;
        const data = await StudyRequest.find({ studentId: studentId, status: 'accepted' }).populate('teacherId', '-Password');
        data.forEach((teacher) => {
            teacherIds.push(teacher.teacherId._id);
        });
        for (const id of teacherIds) {
            const sched = await TeacherScheduleModel.find({ Teacher: id }).populate('Teacher', '-Password');
            result.push(sched);
        }
        return res.status(200).json(result);
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
exports.AllTeachers = async (req, res) => {
    try {
        const data = await Teacher.find().select('-Password');
        return res.status(200).json({
            msg: "Fetched all teachers successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Server Error',
            err: error.message || error
        });
    }
}
exports.StudyRequests = async (req, res) => {
    try {
        const studentId = req.userId;
        const { teacherId } = req.body;
        if (!teacherId) {
            return res.status(400).json("Teacher Id not found");
        }
        const data = new StudyRequest({
            studentId: studentId,
            teacherId: teacherId
        })
        await data.save();
        return res.status(200).json("Request send successfully");
    } catch (error) {
        return res.status(500).json({
            msg: 'Server Error',
            err: error.message || error
        });
    }
}
exports.FetchStudyRequests = async (req, res) => {
    try {
        const teacherId = req.userId;
        const data = await StudyRequest.find({ teacherId }).populate('studentId', '-Password');
        if (!data) {
            return res.status(404).json({ msg: "Study request not found" });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            msg: 'Server Error',
            err: error.message || error
        });
    }
}
exports.FetchStudyRequestsStatusForStudent = async (req, res) => {
    try {
        const studentId = req.userId;
        const data = await StudyRequest.find({ studentId: studentId }).populate('teacherId', '-Password');
        if (!data) {
            return res.status(404).json({ msg: "Study request not found" });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            msg: 'Server Error',
            err: error.message || error
        });
    }
}
exports.ApproveStudyRequests = async (req, res) => {
    try {
        const teacherId = req.userId;
        const { approval, studentId } = req.body;
        if (!studentId || typeof approval === 'undefined') {
            return res.status(400).json({ msg: "Student ID and Approval status are required" });
        }
        const status = approval === true ? 'accepted' : 'rejected';
        const data = await StudyRequest.findOneAndUpdate(
            { studentId: studentId, teacherId: teacherId },
            { status: status },
            { new: true }
        );
        if (!data) {
            return res.status(404).json({ msg: "Study request not found" });
        }
        return res.status(200).json({ msg: "Study request updated successfully", data });
    } catch (error) {
        return res.status(500).json({
            msg: 'Server Error',
            err: error.message || error
        });
    }

}

exports.Attendence = async (req, res) => {
    try {
        const teacherId = req.userId;
        const { schedule, records } = req.body;

        if (!schedule || !records || !Array.isArray(records)) {
            return res.status(400).json({ message: 'Schedule and records are required.' });
        }

        const newAttendance = new StudentAttendance({
            schedule,
            teacher: teacherId,
            records
        });

        await newAttendance.save();

        res.status(201).json({
            message: 'Attendance marked successfully.',
            data: newAttendance
        });
    } catch (error) {
        console.error('Error saving attendance:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
exports.getStudentAttendance = async (req, res) => {
    try {
        const teacherId = req.userId;
        const attendanceData = await StudentAttendance.find({ teacher: teacherId })
            .populate('records.student')
            .populate('schedule');
        const attendanceByStudent = {};
        attendanceData.forEach(att => {
            att.records.forEach(record => {
                const studentId = record.student._id.toString();
                if (!attendanceByStudent[studentId]) {
                    attendanceByStudent[studentId] = {
                        student: record.student,
                        present: 0,
                        absent: 0,
                        total: 0
                    };
                }

                attendanceByStudent[studentId].total += 1;
                if (record.status === 'present') {
                    attendanceByStudent[studentId].present += 1;
                } else if (record.status === 'absent') {
                    attendanceByStudent[studentId].absent += 1;
                }
            });
        });
        res.status(200).json({ data: Object.values(attendanceByStudent) });
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error',
            err: err.message || err
        });
    }
}
exports.setAttendence = async (req, res) => {
    try {
        const { scheduleId } = req.body;
        const data = await TeacherScheduleModel.findByIdAndUpdate(scheduleId, {
            attendancetaken: true
        }, { new: true });
        if (data) {
            return res.status(200).json("Updated successsfully");
        } else {
            return res.status(401).json("Data not found");
        }
    } catch (error) {
        return res.status(500).json("server error", error.message);
    }
}

exports.uploadAssignment = async (req, res) => {
    const { description, schedule } = req.body;
    const teacherId = req.userId;
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    try {
        let assignment = await Assignment.findOne({ schedule, teacher: teacherId });

        const assignmentData = files.map(file => ({
            file: file.path,
            description: description || ''
        }));

        if (assignment) {
            assignment.assignments.push(...assignmentData);
        } else {
            assignment = new Assignment({
                schedule,
                teacher: teacherId,
                assignments: assignmentData
            });
        }

        await assignment.save();

        return res.status(200).json({
            msg: 'Assignments uploaded successfully',
            data: assignment
        });
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error',
            err: err.message || err
        });
    }
};
exports.studentWork = async (req, res) => {

    const { description, schedule } = req.body;
    const studentId = req.userId;
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    try {

        let assignment = await StudentAssignment.findOneAndUpdate({ schedule, studentId: studentId });
        const assignmentData = files.map(file => ({
            file: file.path,
            description: description || ''
        }));
        if (assignment) {
            assignment.assignments.push(...assignmentData);
        } else {
            assignment = new StudentAssignment({
                schedule,
                studentId: studentId,
                assignments: assignmentData
            });
        }
        await assignment.save();
        return res.status(200).json({
            msg: 'Assignments uploaded successfully',
            data: assignment
        });
    } catch (err) {
        return res.status(500).json({
            msg: 'Server Error',
            err: err.message || err
        });
    }
}
exports.allAssignments = async (req,res)=>{
    try {
        const {scheduleId} = req.body;
        const data  = await Assignment.findOne({schedule:scheduleId});
        if(!data){
            return res.status(401).json('no assignments found')
        }else{
            return res.status(200).json({msg:"All assignments are here",data:data});
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Server Error',
            err: error.message || error
        });
    }
}

// Update student subjects
exports.updateStudentSubjects = async (req, res) => {
    try {
        const studentId = req.userId; // Get student ID from authenticated user
        const { subjects } = req.body; // Get subjects array from request body

        // Validate if subjects is provided and is an array
        if (!subjects || !Array.isArray(subjects)) {
            return res.status(400).json({ 
                msg: "Subjects array is required" 
            });
        }

        // Find and update the student's subjects
        const updatedStudent = await studentModel.findByIdAndUpdate(
            studentId,
            { Subjects: subjects },
            { 
                new: true, // Return the updated document
                runValidators: true // Run schema validators
            }
        ).select('-Password'); // Exclude password from response

        if (!updatedStudent) {
            return res.status(404).json({ 
                msg: "Student not found" 
            });
        }

        return res.status(200).json({
            msg: "Subjects updated successfully",
            student: updatedStudent
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Server Error',
            err: error.message || error
        });
    }
}