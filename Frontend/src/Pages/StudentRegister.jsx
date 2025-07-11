import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { PiStudentThin } from "react-icons/pi";
import 'animate.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { useState } from 'react';

const StudentRegister = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [picture, setPicture] = useState(null);
    const handleFilechange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPicture(imageUrl);
        }
    };


    async function HandleRegister() {
        try {
            const response = await axios.post("http://localhost:7000/api/student/register", {
                FullName: fullName,
                PhoneNumber: phoneNumber,
                Email: email,
                Password: password,
                Gender: gender,
                ProfilePicture: picture,
            })
            toast(response.data.msg);
        } catch (error) {
            toast(error.response?.data?.err || error.message || "An error occurred");
            console.error('Error:', error.response?.data || error.message);
        }
    }
    return (
        <>
            <div className='animate__animated animate__fadeIn  w-full flex flex-col p-2 h-[100vh] overflow-y-auto gap-3 md:gap-10 bg-[#e8ebee] md:items-center'>
                <div className='md:w-[30%] w-full flex flex-row gap-2 '>
                    <IoMdArrowBack className='text-xl relative top-[3px] text-blue-500 ' />
                    <Link className='text-blue-500' to='/Home'>Back To Home</Link>
                </div>
                <div className='shadow-2xl bg-white min-h-[900px] md:min-h-[130%] flex-1 rounded-md flex flex-col gap-3 md:gap-7 items-center md:w-[30%]'>
                    <div className='w-full h-[15%] flex flex-row items-center justify-center'>
                        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-full p-4 inline-flex items-center justify-center">
                            <PiStudentThin className="text-5xl text-white" />
                        </div>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <h1 className='text-2xl font-bold'>Student Portal</h1>
                        <p className='text-gray-500 font-thin'>Register to access your learning dashboard</p>
                    </div>
                    <div className='w-full flex flex-col p-3 gap-1 h-[50%] md:h-[42%] md:p-4'>
                        <label>Full Name</label>
                        <input
                            type="text"
                            className='border-2 border-gray-200 h-[30%] md:h-[35%] p-2 rounded-md'
                            placeholder='Enter your full name'
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />

                        <label>Phone Number</label>
                        <input
                            type="text"
                            className='border-2 border-gray-200 h-[30%] md:h-[35%] p-2 rounded-md'
                            placeholder='Enter your phone number'
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />

                        <label>Email Address</label>
                        <input
                            type="text"
                            className='border-2 border-gray-200 h-[30%] md:h-[35%] p-2 rounded-md'
                            placeholder='Teacher@school.edu'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            className='border-2 border-gray-200 h-[30%] md:h-[35%] p-2 rounded-md'
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label>Gender</label>
                        <select
                            className='border-2 border-gray-200 h-[30%] md:h-[35%] p-2 rounded-md'
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>

                        <label>Picture Upload</label>
                        <input
                            type="file"
                            accept="image/*"
                            className='border-2 border-gray-200 h-[30%] md:h-[35%] p-2 rounded-md'
                            onChange={handleFilechange}
                        />
                    </div>
                    {picture && (
                            <div className="flex justify-center items-center w-full py-18 h-[10%] md:h-[100px] relative md:mb-[10px]">
                                <img
                                    src={picture}
                                    alt="Uploaded Preview"
                                    style={{ width: '200px', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                    className="border border-gray-300 absolute md:top-[20px] md:mb-[10px]"
                                />
                            </div>
                        )}
                    <div className='h-[15%] flex flex-col w-[90%] md:w-[92%] justify-center items-center border-b-2 border-gray-300 pb-3'>
                        <button onClick={HandleRegister} className='border-2 border-green-200 w-full h-[40%] rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-200'>
                            Sign Up
                        </button>
                        <ToastContainer />
                        <p className="text-sm mt-3">
                            Already have an account?{' '}
                            <Link to="/StudentLogin" className="text-green-700 font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                    <div className='text-center'>
                        <p>Need help accessing your account? <Link className='text-green-700'>Contact IT support</Link></p>
                    </div>
                </div>
                <div className='md:w-[30%]'>
                    <img className='rounded-md ' src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" />
                </div>
            </div>
        </>
    )
}

export default StudentRegister;
