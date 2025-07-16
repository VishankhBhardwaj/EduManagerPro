const express = require("express")
const router=express.Router();
const { Schedule, AllSchedule, teacherData, UpdateTeacherData } = require('../Controllers/DashboardController');
const verifyToken = require('../Middleware/verifyToken');

router.post('/schedule',verifyToken,Schedule);
router.get('/AllSchedules',verifyToken,AllSchedule);
router.get('/teacherData',verifyToken,teacherData);
router.post('/updateData',verifyToken,UpdateTeacherData);
module.exports=router;