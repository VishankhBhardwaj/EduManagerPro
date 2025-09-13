import React from 'react'
import { BsSend } from "react-icons/bs";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Teachers = () => {
    const [teachersInfo, setTeachersInfo] = useState([]);
    const [sendedRequest, setSendedRequest] = useState([]);
    const [alreadySendedRequest, setAlreadySendedRequest] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        console.log(alreadySendedRequest);
    }, [alreadySendedRequest]);
    const handleSubmitRequest = async (teacherId) => {
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
            setSendedRequest(prev => [...prev, teacherId]);
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
        const fetchRequestStatus = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:7000/api/studyrequest/sendedRequest', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAlreadySendedRequest(res.data);
        }
        fetchRequestStatus();
    }, []);
    return (
        <div className='flex flex-col p-2 sm:p-3 lg:p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
            <div className='w-full h-auto sm:h-[20%] flex flex-col sm:flex-row sm:justify-between p-2 sm:p-3'>
                <div>
                    <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl'>Available Teachers</h1>
                    <p className='text-sm sm:text-lg lg:text-2xl text-gray-400'>Send a request to study with a teacher</p>
                </div>
            </div>
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-3 sm:px-4 py-2 rounded-md w-full sm:w-[70%] lg:w-[50%] outline-none mb-2"
            />

            {
                teachersInfo && teachersInfo.length > 0 ? (
                    teachersInfo.filter((teacher) =>
                        teacher.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        teacher.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        teacher.SubjectsTeaching.some(subject =>
                            subject.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    ).map((teacher, index) => (
                        <div key={index} className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 p-3 sm:p-4 lg:p-4 bg-white rounded-lg shadow-md w-full border border-gray-500">
                            <div className='flex flex-row gap-2 sm:gap-3 lg:gap-4 flex-1'>
                                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm flex-shrink-0">
                                    <img src={teacher.ProfilePic || '/pp.jpg'} alt="" className='object-cover rounded-full w-full h-full' />
                                </div>
                                <div className='flex flex-col gap-1 flex-1 min-w-0'>
                                    <h3 className='text-sm sm:text-lg lg:text-2xl font-semibold truncate'>{teacher.FullName}</h3>
                                    <p className='text-xs sm:text-sm lg:text-xl text-gray-500 truncate'>{teacher.Email}</p>
                                    <div className='w-full flex flex-row flex-wrap gap-1 sm:gap-2 lg:gap-3'>
                                        {teacher.SubjectsTeaching.map((subject, index) => (
                                            <span key={index} className='text-black bg-white text-center px-1 sm:px-2 py-0.5 rounded-full text-xs sm:text-sm lg:text-md font-semibold border border-gray-300'>
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row justify-center sm:justify-end items-center flex-shrink-0'>
                                {alreadySendedRequest.some(item => item.teacherId._id === teacher._id) || sendedRequest.includes(teacher._id) ? (() => {
                                    const matched = alreadySendedRequest.find(item => item.teacherId._id === teacher._id);
                                    const status = matched ? matched.status : 'Request Sent';

                                    return (
                                        <div className='flex flex-col sm:flex-row gap-2 sm:gap-3'>
                                            <button className="bg-gray-100 text-black font-semibold text-xs sm:text-sm lg:text-base px-2 sm:px-3 py-1 sm:py-2 rounded-full whitespace-nowrap">
                                                {status}
                                            </button>

                                            {status === 'rejected' && (
                                                <button
                                                    onClick={() => handleSubmitRequest(teacher._id)}
                                                    className="bg-black text-white w-full sm:w-[140px] lg:w-[170px] h-8 sm:h-10 lg:h-[50px] hover:rounded-tr-none hover:shadow-2xl hover:bg-zinc-800 transition-all duration-200 text-xs sm:text-sm lg:text-lg flex flex-row rounded-md justify-center items-center gap-1 sm:gap-2"
                                                >
                                                    <BsSend className="text-xs sm:text-sm lg:text-base" />
                                                    <span className="hidden sm:inline">Send Again</span>
                                                    <span className="sm:hidden">Again</span>
                                                </button>
                                            )}
                                        </div>
                                    );
                                })() : (
                                    <button
                                        onClick={() => handleSubmitRequest(teacher._id)}
                                        className="bg-black text-white w-full sm:w-[120px] lg:w-[170px] h-8 sm:h-10 lg:h-[40px] hover:rounded-tr-none hover:shadow-2xl hover:bg-zinc-800 transition-all duration-200 text-xs sm:text-sm lg:text-lg flex flex-row rounded-md justify-center items-center gap-1 sm:gap-2"
                                    >
                                        <BsSend className="text-xs sm:text-sm lg:text-base" />
                                        <span className="hidden sm:inline">Send Request</span>
                                        <span className="sm:hidden">Send</span>
                                    </button>
                                )}

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