import React, { useState } from 'react'
import Navbar from '../../../Components/navbar'
import Profile from './Profile';
import Courses from './Courses';
import Schedule from './Schedule';
import { FaUser, FaBook, FaCalendarAlt } from 'react-icons/fa';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

import 'animate.css'
import Teachers from './Teachers';
const Student = () => {
    const [tab, setTab] = useState('Profile');

    return (
        <div className='bg-[#f9fafb]'>
            <Navbar />
            <div className='w-full min-h-screen p-4 flex flex-col space-y-3 md:p-10'>
                <div className='w-full flex flex-row bg-[#f4f4f5] rounded-md border-2 border-green-300'>
                    <ul className='flex flex-row flex-1 flex-wrap gap-2 justify-evenly p-1 w-full'>
                        <li
                            onClick={() => setTab('Profile')}
                            className={`p-2 w-[30%] md:w-[35%] text-center font-bold rounded-lg text-gray-500 cursor-pointer transition-all duration-200 ${tab === 'Profile' ? 'bg-white shadow-xl text-green-400' : 'bg-[#f4f4f5]'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <FaUser />
                                Profile
                            </div>
                        </li>
                        <li
                            onClick={() => setTab('Courses')}
                            className={`p-2 w-[30%] md:w-[35%] text-center font-bold rounded-lg text-gray-500  cursor-pointer transition-all duration-200 ${tab === 'Courses' ? 'bg-white shadow-xl text-green-400' : 'bg-[#f4f4f5]'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <FaBook />
                                Courses
                            </div>
                        </li>
                        <li
                            onClick={() => setTab('Schedule')}
                            className={`p-2 w-[30%] md:w-[35%] text-center font-bold rounded-lg text-gray-500 cursor-pointer transition-all duration-200 ${tab === 'Schedule' ? 'bg-white shadow-xl text-green-400' : 'bg-[#f4f4f5]'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <FaCalendarAlt />
                                Schedule
                            </div>
                        </li>
                        <li
                            onClick={() => setTab('Teachers')}
                            className={`p-2 w-[30%] md:w-[35%] text-center font-bold rounded-lg text-gray-500 cursor-pointer transition-all duration-200 ${tab === 'Teachers' ? 'bg-white shadow-xl text-green-400' : 'bg-[#f4f4f5]'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <LiaChalkboardTeacherSolid />
                                Teachers
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='h-[100%]'>
                    {tab === 'Profile' ? <Profile /> : ''}
                    {tab === 'Courses' ? <Courses /> : ''}
                    {tab === 'Schedule' ? <Schedule /> : ''}
                    {tab === 'Teachers' ? <Teachers/> : ''}
                </div>
            </div>
        </div>
    );
};

export default Student;
