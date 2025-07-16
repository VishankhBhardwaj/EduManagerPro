import {React,useState} from 'react'
import 'animate.css'
import { useEffect } from 'react';
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'
const Profile = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [studentInfo, setStudentInfo] = useState({});
    const [updatedInfo, setUpdatedInfo] = useState({});


    async function handleSave() {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                'http://localhost:7000/api/updateStudentData/updateData',
                updatedInfo,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setStudentInfo(updatedInfo);
            toast.success(res.data.msg);
        } catch (err) {
            console.error('Error saving teacher data:', err);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:7000/api/showStudentData/studentData', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStudentInfo(res.data);
            setUpdatedInfo(res.data);
        }
        fetchData();
    }, []);
    return (
        <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
            <div className='w-full h-[20%] flex flex-row md:justify-between'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl'>Personal Information</h1>
                    <p className='text-xl text-gray-400 md:text-2xl'>view and update your peronal details</p>
                </div>
                <div className='p-5'>
                    <button onClick={() => {
                            if (isEditable) handleSave();
                            setIsEditable(!isEditable);
                        }} className={`border-2 rounded-md w-[100px] h-[50px] transition-all duration-200 ${isEditable ? 'bg-blue-500 text-white w-[150px]' : 'bg-white text-black'}`}>{isEditable ? 'Save' : 'Edit'}</button>
                        <ToastContainer/>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md w-full">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    <img src={studentInfo.ProfilePic} alt="" className='rounded-full object-cover' />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">{studentInfo.FullName}</h2>
                    <span className="bg-gray-100 text-sm font-semibold text-black px-3 py-1 rounded-full w-fit mt-1">
                        Grade 10
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                        Student ID: <span className="font-medium">{studentInfo._id}</span>
                    </p>
                </div>
            </div>
            <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md w-full'>
                <div className='w-full flex flex-col md:flex-row md:gap-2'>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Full Name</label>
                        <input readOnly={!isEditable} type="text" value={updatedInfo.FullName || ""} onChange={(e) => setUpdatedInfo({ ...updatedInfo, FullName: e.target.value })}  className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Email</label>
                        <input readOnly={!isEditable} type="text" value={updatedInfo.Email || ""} onChange={(e) => setUpdatedInfo({ ...updatedInfo, Email: e.target.value })}  className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row md:gap-2'>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Phone</label>
                        <input readOnly={!isEditable} type="text" value={updatedInfo.PhoneNumber || ""} onChange={(e) => setUpdatedInfo({ ...updatedInfo, PhoneNumber: e.target.value })}  className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Date of Birth</label>
                        <input
                            readOnly={!isEditable}
                            type="date"
                            value={updatedInfo.DOB ? updatedInfo.DOB.substring(0, 10) : ""}
                            onChange={(e) => setUpdatedInfo({ ...updatedInfo, DOB: e.target.value })}
                            className={`${isEditable ? "cursor-pointer" : "cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`}
                        />
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row md:gap-2'>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Guardian Name</label>
                        <input readOnly={!isEditable} type="text" value={updatedInfo.GuardianName|| ""} onChange={(e) => setUpdatedInfo({ ...updatedInfo, GuardianName: e.target.value })}  className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Grade</label>
                        <select disabled={!isEditable}
                        onChange={(e) => setUpdatedInfo({ ...updatedInfo, Grade: e.target.value })}
                         className={`h-[40px] p-2 bg-white border-2 border-gray-200 rounded-md ${isEditable?"cursor-pointer":"cursor-not-allowed"} `}>
                            <option value="">{updatedInfo.Grade || "Select Grade"}</option>
                            <option value="9">Grade 9</option>
                            <option value="10">Grade 10</option>
                            <option value="11">Grade 11</option>
                            <option value="12">Grade 12</option>
                        </select>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="" className='font-bold'>Address</label>
                    <input readOnly={!isEditable} type="text" value={updatedInfo.Address|| ""} onChange={(e) => setUpdatedInfo({ ...updatedInfo, Address: e.target.value })} className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                </div>
            </div>
        </div>
    )
}

export default Profile