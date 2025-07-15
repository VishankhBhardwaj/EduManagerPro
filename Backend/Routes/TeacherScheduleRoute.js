const express = require("express")
const router=express.Router();
const {Schedule} = require('../Controllers/TeacherScheduleController');
const {AllSchedule} = require('../Controllers/TeacherScheduleController');
const {teacherData} = require('../Controllers/TeacherScheduleController');
const {UpdateTeacherData} = require('../Controllers/TeacherScheduleController');
const verifyToken = require('../Middleware/verifyToken');

router.post('/schedule',verifyToken,Schedule);
router.get('/AllSchedules',verifyToken,AllSchedule);
router.get('/teacherData',verifyToken,teacherData);
router.post('/updateData',verifyToken,UpdateTeacherData);
module.exports=router;