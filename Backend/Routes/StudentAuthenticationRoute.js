const express = require("express")
const router = express.Router();
const { studentInfo, studentLogin, studentRecovery } = require("../Controllers/StudentAuthController");
router.post('/register',studentInfo);
router.post('/login',studentLogin);
router.post('/recovery',studentRecovery);









module.exports = router;