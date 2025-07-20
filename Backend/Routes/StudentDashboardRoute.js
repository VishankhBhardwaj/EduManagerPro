const express = require("express")
const router = express.Router();

const { studentData,UpdateStudentData,AllTeachers,StudyRequests } = require('../Controllers/DashboardController');
const verifyToken = require('../Middleware/verifyToken');

router.get('/studentData',verifyToken,studentData);
router.post('/updateData',verifyToken,UpdateStudentData);
router.get('/teachers',AllTeachers);
router.post('/request',verifyToken,StudyRequests);
module.exports = router;
