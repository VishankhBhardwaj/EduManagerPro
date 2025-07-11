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
app.use('/api/student', studentroute);
app.use('/api/teacher', teacherRoute);

app.listen(PORT || 5000, () => {
    console.log("Server is running on port", PORT || 5000);
});