import React, { useState, useEffect } from 'react'
import 'animate.css'
import { RiCloseFill } from "react-icons/ri";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const TeacherSchedule = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [Day, setDay] = useState('');
    const [SubjectName, setSubjectName] = useState('');
    const [StartTime, setStartTime] = useState('');
    const [EndTime, setEndTime] = useState('');
    const [AllSchedules, setAllSchedules] = useState([]);


    async function handleClick() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:7000/api/addSchedule/schedule',
                {
                    Day: Day,
                    SubjectName: SubjectName,
                    StartTime: StartTime,
                    EndTime: EndTime
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast(response?.data?.msg);
            setIsOpen(false);
        } catch (error) {
            toast(error.response?.data?.msg || error.message || "An error occurred");
            console.error('Error:', error.response?.data || error.message);
        }
    }
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
        <>
            <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
                <div className='w-full h-[20%] flex flex-row md:justify-between md:p-3'>
                    <div>
                        <h1 className='font-bold text-2xl md:text-3xl'>Teaching Schedule</h1>
                        <p className='text-lg text-gray-400 md:text-2xl'>Your weekly teaching schedule</p>
                    </div>
                    <div>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-black text-white px-4 py-2 rounded"
                        >
                            Add Schedule
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-2 bg-white rounded-lg shadow-md w-full md:p-4 ">
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
                                📧 <b>Email:</b> {daySchedule.Teacher?.Email}
                            </p>
                            <p className="text-gray-600">
                                📞 <b>Phone:</b> {daySchedule.Teacher?.PhoneNumber}
                            </p>
                        </div>
                    ))}
                </div>


            </div>
            {
                isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 animate__animated animate__fadeIn ">
                        <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] animate_animated animate__fadeIn ">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold">Add New Class Schedule</h2>
                                    <p className='text-gray-400'>Add a new class to your weekly teaching schedule
                                    </p>
                                </div>
                                <button onClick={() => setIsOpen(false)}><RiCloseFill /></button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="">Day</label>
                                    <select
                                        value={Day}
                                        onChange={(e) => setDay(e.target.value)}
                                        className="w-full p-2 border rounded">
                                        <option>Select day</option>
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                        <option>Thursday</option>
                                        <option>Friday</option>
                                        <option>Saturday</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Subject Name</label>
                                    <input
                                        value={SubjectName}
                                        onChange={(e) => setSubjectName(e.target.value)}
                                        type="text"
                                        placeholder="Enter subject name"
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-between gap-2">
                                    <div>
                                        <label htmlFor="">Start Time</label>
                                        <input
                                            value={StartTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            type="time" className="w-full p-2 border rounded" />
                                    </div>
                                    <div>
                                        <label htmlFor="">End Time</label>
                                        <input
                                            value={EndTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            type="time" className="w-full p-2 border rounded" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    className="px-4 py-2 border rounded"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button onClick={handleClick} className="px-4 py-2 bg-black text-white rounded">
                                    Add to Schedule
                                </button>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default TeacherSchedule