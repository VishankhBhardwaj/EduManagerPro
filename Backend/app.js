const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json({ limit: "100mb" })); 
app.use(express.urlencoded({ limit: "100mb", extended: true }));
require('dotenv').config();
require('../Backend/db/config');
const PORT=process.env.PORT;
const studentroute=require('./Routes/StudentAuthenticationRoute');
const teacherRoute = require('./Routes/TeacherAuthenticationRoute');
const teacherScheduleRoute = require('./Routes/TeacherScheduleRoute');
const studentDataRoute = require('./Routes/StudentDashboardRoute');
app.use('/api/student', studentroute);
app.use('/api/teacher', teacherRoute);
app.use('/api/addSchedule',teacherScheduleRoute);
app.use('/api/showSchedule',teacherScheduleRoute);
app.use('/api/showTeacherData',teacherScheduleRoute);
app.use('/api/updateTeacherData',teacherScheduleRoute);
app.use('/api/requests',teacherScheduleRoute);
app.use('/api/showStudentData',studentDataRoute);
app.use('/api/updateStudentData',studentDataRoute);
app.use('/api/showTeachersData',studentDataRoute);
app.use('/api/studyrequest',studentDataRoute);
app.listen(PORT || 5000, () => {
    console.log("Server is running on port", PORT || 5000);
});