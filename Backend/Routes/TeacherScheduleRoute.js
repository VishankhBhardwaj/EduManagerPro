const express = require("express")
const router=express.Router();
const { Schedule, AllSchedule, teacherData, UpdateTeacherData,FetchStudyRequests,ApproveStudyRequests,AllScheduleStudent,setAttendence,uploadAssignment } = require('../Controllers/DashboardController');
const verifyToken = require('../Middleware/verifyToken');
const upload = require('../Multer/file');
router.post('/schedule',verifyToken,Schedule);
router.get('/AllSchedules',verifyToken,AllSchedule);
router.get('/AllSchedulesStudent',verifyToken,AllScheduleStudent);
router.get('/teacherData',verifyToken,teacherData);
router.post('/updateData',verifyToken,UpdateTeacherData);
router.get('/fetchRequests',verifyToken,FetchStudyRequests);
router.post('/approval',verifyToken,ApproveStudyRequests);
router.put('/setAttendance',setAttendence);
router.post('/uploadAssignment',verifyToken,upload.array('files'),uploadAssignment)
module.exports=router;