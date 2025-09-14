import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
const StudyRequest = () => {
    const [request, setRequest] = useState([]);

    // Function to fetch requests data
    const fetchRequests = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/requests/fetchRequests', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRequest(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleApproval = async (approval, studentId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:7000/api/requests/approval', { approval, studentId }, { headers: { Authorization: `Bearer ${token}` } });
            
            // Refetch requests after successful approval/rejection
            await fetchRequests();
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);
  return (
    <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
            <div className="bg-white rounded-xl shadow p-6  mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">My Students</h1>
                        <p className="text-gray-500 text-sm">Students under your supervision</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 font-semibold text-gray-500 border-b pb-2 mb-2">
                    <div className='text-center text-xs md:text-xl'>Student</div>
                    <div className='text-center text-xs md:text-xl'>Grade</div>
                    <div className='text-center text-xs md:text-xl'>Email</div>
                    <div className='text-center text-xs md:text-xl'>Present</div>
                </div>
                {request
                    .filter(student => student.status === 'pending')
                    .map((student, index) => (
                        <div key={index} className="flex flex-col gap-1 md:gap-2 md:grid md:grid-cols-5 items-center py-1 md:py-4 border-b  border-2 border-gray-300 rounded-md md:border-none">
                            <div className="flex flex-col md:flex-row items-center gap-3">
                                <div className="h-10 w-10 rounded-full">
                                    <img src={student.studentId.ProfilePic || '/pp.jpeg'} alt="" className='h-full w-full rounded-full' />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{student.studentId.FullName}</div>
                                    <div className="text-xs text-gray-500">{student.studentId.id}</div>
                                </div>
                            </div>
                            <div>{student.studentId.Grade}</div>
                            <div className="text-sm">{student.studentId.Email}</div>
                            <div className="flex flex-wrap gap-3 md:gap-2">
                                {student && student.studentId.Subject && student.studentId.Subject.length > 0 && (
                                    student.studentId.Subject.map((course, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-sm px-2 py-1 rounded-full text-gray-700"
                                        >
                                            {course}
                                        </span>
                                    ))
                                )}
                            </div>
                            <div className="flex justify-center gap-3">
                                <button onClick={() => handleApproval(true, student.studentId._id)} className="bg-white hover:bg-gray-200 transition-all shadow-md hover:shadow-3xl duration-200 text-black border border-gray-400 px-6 py-2 rounded-lg flex flex-row justify-evenly items-center">
                                    <IoMdCheckmark />
                                    Accept
                                </button>
                                <button onClick={() => handleApproval(false, student.studentId._id)} className="bg-red-500 hover:bg-red-400 shadow-md hover:shadow-3xl transition-all duration-200 text-white px-6 py-2 rounded-lg flex flex-row justify-evenly items-center">
                                    <RxCross1 />
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
  )
}

export default StudyRequest