import React from 'react'
import 'animate.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
const Schedule = () => {
    const now = new Date();
    const date = now.toLocaleDateString(); 
    const time = now.toLocaleTimeString();
    const [AllSchedules, setAllSchedules] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:7000/api/showSchedule/AllSchedules', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAllSchedules(res.data);
            } catch (err) {
                console.error("Error fetching schedules:", err);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
            <div className='w-full h-[20%] flex flex-row md:justify-between md:p-3'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl'>Class Schedule</h1>
                    <p className='text-lg text-gray-400 md:text-2xl'>Your weekly class Schedule</p>
                </div>

                {/* yhaaaaa fix */}
                <div className='border-2 border-red-400 w-[70%]'>
                    {AllSchedules.map((daySchedule,index)=>(
                        <p className="text-gray-600">
                            📘 <b>Subject:</b> {daySchedule.SubjectName}
                        </p>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-4 p-2 bg-white rounded-lg shadow-md w-full md:p-4">
                {AllSchedules.map((daySchedule, index) => (
                    <div key={index} className='w-full border-2 border-gray-200 p-3 rounded-lg animate__animated animate__fadeIn animate__duration-1s' style={{ animationDelay: `${index * 0.4}s` }}>
                        <h1 className="text-xl font-semibold">{daySchedule.Day}</h1>
                        <p className="text-gray-600">
                            📘 <b>Subject:</b> {daySchedule.SubjectName}
                        </p>
                        <p className="text-gray-600">
                            ⏰ <b>Time:</b> {daySchedule.StartTime} - {daySchedule.EndTime}
                        </p>
                        <p className="text-gray-600">
                            👨‍🏫 <b>Teacher:</b> {daySchedule.Teacher?.FullName || daySchedule.FullName || "N/A"}
                        </p>
                        <p className="text-gray-600">
                            📧 <b>Email:</b> {daySchedule.Teacher?.Email}
                        </p>
                        <p className="text-gray-600">
                            📞 <b>Phone:</b> {daySchedule.Teacher?.PhoneNumber}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Schedule