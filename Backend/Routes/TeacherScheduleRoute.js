const express = require("express")
const router=express.Router();
const { Schedule, AllSchedule, teacherData, UpdateTeacherData,FetchStudyRequests,ApproveStudyRequests } = require('../Controllers/DashboardController');
const verifyToken = require('../Middleware/verifyToken');

router.post('/schedule',verifyToken,Schedule);
router.get('/AllSchedules',verifyToken,AllSchedule);
router.get('/teacherData',verifyToken,teacherData);
router.post('/updateData',verifyToken,UpdateTeacherData);
router.get('/fetchRequests',verifyToken,FetchStudyRequests);
router.post('/approval',verifyToken,ApproveStudyRequests);
module.exports=router;