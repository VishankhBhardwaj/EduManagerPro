const express = require("express")
const router = express.Router();

const {studentInfo} = require("../Controllers/StudentAuthController");
const {studentLogin} = require("../Controllers/StudentAuthController");
const {studentRecovery} = require("../Controllers/StudentAuthController");
router.post('/register',studentInfo);
router.post('/login',studentLogin);
router.post('/recovery',studentRecovery);









module.exports = router;