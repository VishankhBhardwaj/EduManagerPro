const express = require("express")
const router = express.Router();

const { teacherInfo, teacherLogin } = require("../Controllers/TeacherAuthController");
router.post('/register',teacherInfo);
router.post('/login',teacherLogin);










module.exports = router;