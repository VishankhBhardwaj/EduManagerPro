import React from 'react'
import { BsSend } from "react-icons/bs";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Teachers = () => {
    const [teachersInfo, setTeachersInfo] = useState([]);
    
    const handleSubmitRequest = async(teacherId)=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
            "http://localhost:7000/api/studyrequest/request",
            { teacherId },
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }
            );
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:7000/api/showTeachersData/teachers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTeachersInfo(res.data.data);
        }
        fetchData();
    }, []);
    return (
        <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
            <div className='w-full h-[20%] flex flex-row md:justify-between md:p-3'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl'>Available Teachers</h1>
                    <p className='text-lg text-gray-400 md:text-2xl'>Send a request to study with a teacher</p>
                </div>
            </div>
            {
                teachersInfo && teachersInfo.length > 0 ? (
                    teachersInfo.map((teacher, index) => (
                        <div key={index} className="flex flex-row justify-between gap-4 p-2 bg-white rounded-lg shadow-md w-full md:p-4 border border-gray-500">
                            <div className='flex flex-row gap-2 md:gap-4'>
                                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                                    <img src={teacher.ProfilePic || '/pp.jpg'} alt="" className='object-cover rounded-full' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h3 className='text-xs md:text-2xl font-semibold'>{teacher.FullName}</h3>
                                    <p className='text-xs text-gray-500 md:text-xl'>{teacher.Email}</p>
                                    <ul className='w-full flex flex-row flex-wrap gap-3'>
                                        {teacher.SubjectsTeaching.map((subject, index) => (
                                            <li key={index} className='text-black bg-white text-center px-0.5 md:px-2 rounded-full text-xs md:text-md font-semibold border border-gray-300'>
                                                {subject}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='flex flex-row justify-between items-center'>
                                <button onClick={()=>handleSubmitRequest(teacher._id)} className='bg-black text-white w-[100px] md:w-[170px] md:h-[40px] hover:rounded-tr-none hover:shadow-2xl hover:bg-zinc-800 transition-all duration-200 p-2 text-xs md:text-lg flex flex-row rounded-md justify-evenly items-center'>
                                    <BsSend />
                                    <span className="ml-2">Send Request</span>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400">No teachers available.</div>
                )
            }
        </div >
    )
}

export default Teachers