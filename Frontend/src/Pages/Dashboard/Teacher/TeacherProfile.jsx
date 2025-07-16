import { React, useEffect, useState } from 'react'
import 'animate.css'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
const TeacherProfile = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [teacherInfo, setTeacherInfo] = useState({});
    const [updatedInfo, setUpdatedInfo] = useState({});
    async function handleSave() {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                'http://localhost:7000/api/updateTeacherData/updateData',
                updatedInfo,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setTeacherInfo(updatedInfo);
            toast(res.data.msg);
        } catch (err) {
            console.error('Error saving teacher data:', err);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:7000/api/showTeacherData/teacherData', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTeacherInfo(res.data);
            setUpdatedInfo(res.data);
        }
        fetchData();
    }, []);

    return (
        <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
            <div className='w-full h-[20%] flex flex-row md:justify-between'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl'>Personal Information</h1>
                    <p className='text-xl text-gray-400 md:text-2xl'>View and update your personal details</p>
                </div>
                <div className='p-5'>
                    <button
                        onClick={() => {
                            if (isEditable) handleSave();
                            setIsEditable(!isEditable);
                        }}
                        className={`border-2 rounded-md w-[100px] h-[50px] transition-all duration-200 ${isEditable ? 'bg-blue-500 text-white w-[150px]' : 'bg-white text-black'}`}>
                        {isEditable ? 'Save' : 'Edit'}
                    </button>
                    <ToastContainer/>
                </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md w-full">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    <img src={teacherInfo.ProfilePic} alt="" className='rounded-full object-cover' />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">{teacherInfo.FullName}</h2>
                    <span className="bg-gray-100 text-sm font-semibold text-black px-3 py-1 rounded-full w-fit mt-1">
                        Mathematics
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                        Employee ID: <span className="font-medium">{teacherInfo._id}</span>
                    </p>
                </div>
            </div>

            <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md w-full'>
                <div className='w-full flex flex-col md:flex-row md:gap-2'>
                    <div className='w-full flex flex-col gap-2'>
                        <label className='font-bold'>Full Name</label>
                        <input readOnly={!isEditable} type="text"
                            value={updatedInfo.FullName || ""}
                            className={`${isEditable ? "cursor-pointer" : "cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`}
                            onChange={(e) => setUpdatedInfo({ ...updatedInfo, FullName: e.target.value })} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label className='font-bold'>Email</label>
                        <input readOnly={!isEditable} type="text"
                            value={updatedInfo.Email || ""}
                            className={`${isEditable ? "cursor-pointer" : "cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`}
                            onChange={(e) => setUpdatedInfo({ ...updatedInfo, Email: e.target.value })} />
                    </div>
                </div>

                <div className='w-full flex flex-col md:flex-row md:gap-2'>
                    <div className='w-full flex flex-col gap-2'>
                        <label className='font-bold'>Phone</label>
                        <input readOnly={!isEditable} type="text"
                            value={updatedInfo.PhoneNumber || ""}
                            className={`${isEditable ? "cursor-pointer" : "cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`}
                            onChange={(e) => setUpdatedInfo({ ...updatedInfo, PhoneNumber: e.target.value })} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label className='font-bold'>Department</label>
                        <input readOnly={!isEditable} type="text"
                            value={updatedInfo.Department || ""}
                            className={`${isEditable ? "cursor-pointer" : "cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`}
                            onChange={(e) => setUpdatedInfo({ ...updatedInfo, Department: e.target.value })} />
                    </div>
                </div>

                <div className='w-full flex flex-col md:flex-row md:gap-2'>
                    <div className='w-full flex flex-col gap-2'>
                        <label className='font-bold'>Qualification</label>
                        <input readOnly={!isEditable} type="text"
                            value={updatedInfo.Qualification || ""}
                            className={`${isEditable ? "cursor-pointer" : "cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`}
                            onChange={(e) => setUpdatedInfo({ ...updatedInfo, Qualification: e.target.value })} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label className='font-bold'>Experience</label>
                        <select
                            disabled={!isEditable}
                            className={`h-[40px] p-2 bg-white border-2 border-gray-200 rounded-md ${isEditable ? "cursor-pointer" : "cursor-not-allowed"}`}
                            onChange={(e) => setUpdatedInfo({ ...updatedInfo, Experience: e.target.value })}
                        >
                            <option value="">{updatedInfo.Experience || "Select experience"}</option>
                            <option value="9">Years 9</option>
                            <option value="10">Years 10</option>
                            <option value="11">Years 11</option>
                            <option value="12">Years 12</option>
                        </select>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <p>Subject Teaching</p>
                    <ul className='flex flex-row gap-3'>
                        {(teacherInfo.SubjectsTeaching || []).map((subject, idx) => (
                            <li key={idx} className='border-2 border-green-400 px-1 rounded-xl text-sm'>{subject}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TeacherProfile;
