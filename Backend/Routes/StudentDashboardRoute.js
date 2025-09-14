const express = require("express")
const router = express.Router();

const { studentData,UpdateStudentData,AllTeachers,StudyRequests,FetchStudyRequestsStatusForStudent,Attendence,getStudentAttendance,studentWork,allAssignments,updateStudentSubjects } = require('../Controllers/DashboardController');
const verifyToken = require('../Middleware/verifyToken');
const upload = require('../Multer/file');
router.get('/studentData',verifyToken,studentData);
router.post('/updateData',verifyToken,UpdateStudentData);
router.get('/teachers',AllTeachers);
router.post('/request',verifyToken,StudyRequests);
router.get('/sendedRequest',verifyToken,FetchStudyRequestsStatusForStudent);
router.post('/mark',verifyToken,Attendence);
router.get('/attendanceDetails',verifyToken,getStudentAttendance);
router.post('/uploadAssignment',verifyToken,upload.array('files'),studentWork);
router.post('/assignments',allAssignments);
router.put('/update-subjects',verifyToken,updateStudentSubjects);
module.exports = router;
