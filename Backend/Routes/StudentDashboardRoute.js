const express = require("express")
const router = express.Router();

const { studentData,UpdateStudentData } = require('../Controllers/DashboardController');
const verifyToken = require('../Middleware/verifyToken');

router.get('/studentData',verifyToken,studentData);
router.post('/updateData',verifyToken,UpdateStudentData);

module.exports = router;
