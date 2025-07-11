const express = require("express")
const router = express.Router();

const {teacherInfo} = require("../Controllers/TeacherAuthController");
const {teacherLogin} = require("../Controllers/TeacherAuthController");
router.post('/register',teacherInfo);
router.post('/login',teacherLogin);










module.exports = router;