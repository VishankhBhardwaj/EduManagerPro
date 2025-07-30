import React from 'react'
import 'animate.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Assignment from '../../../Components/Assignment';
const Schedule = () => {
    const [AllSchedules, setAllSchedules] = useState([]);
    const [assignmentWindow, setAssignmentWindow] = useState(false);
    const [scheduleData, setScheduleData] = useState(null);
    useEffect(() => {
        console.log(AllSchedules)
    }, [AllSchedules])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:7000/api/showSchedule/AllSchedulesStudent', {
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
        <>
            {
                !assignmentWindow ? (
                    <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
                        <div className='w-full h-[20%] flex flex-row md:justify-between md:p-3'>
                            <div>
                                <h1 className='font-bold text-2xl md:text-3xl'>Class Schedule</h1>
                                <p className='text-lg text-gray-400 md:text-2xl'>Your weekly class Schedule</p>
                            </div>

                            <div className=' w-[70%] p-2 md:p-3 overflow-hidden'>
                                {AllSchedules.flat().filter((data) => {
                                    if (!data?.StartTime) return false;
                                    const startHour = parseInt(data.StartTime.split(':')[0], 10);
                                    return Math.abs(startHour - new Date().getHours()) <= 1;
                                }).map((daySchedule, index) => (
                                    <div
                                        key={index}
                                        className=" bg-gray-100 rounded-md shadow-md p-4  items-center w-[200px] flex animate-marquee gap-6 whitespace-nowrap justify-center"
                                    >
                                        <p key={index} className="text-black">
                                            📘 <b>Subject:</b> {daySchedule.SubjectName}
                                        </p>
                                    </div>

                                ))}

                            </div>
                        </div>
                        <div className="flex flex-col gap-4 p-2 bg-white rounded-lg shadow-md w-full md:p-4">
                            {AllSchedules.map((Schedule, i) => (
                                Schedule.map((daySchedule, j) => (
                                    <div
                                        key={`${i}-${j}`}
                                        onClick={() => { setScheduleData(daySchedule); setAssignmentWindow(true)}}
                                        className='w-full border-2 border-gray-200 p-3 rounded-lg animate__animated animate__fadeIn animate__duration-1s'
                                        style={{ animationDelay: `${j * 0.4}s` }}
                                    >
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
                                            📧 <b>Email:</b> {daySchedule.Teacher?.Email || "N/A"}
                                        </p>
                                        <p className="text-gray-600">
                                            📞 <b>Phone:</b> {daySchedule.Teacher?.PhoneNumber || "N/A"}
                                        </p>
                                    </div>
                                ))
                            ))}

                        </div>
                    </div>
                ) : (
                    <Assignment setAssignmentWindow={setAssignmentWindow} scheduleData={scheduleData} />
                )
            }
        </>
    )
}

export default Schedule