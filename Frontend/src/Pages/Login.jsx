import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { PiStudentThin } from "react-icons/pi";
import 'animate.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const navigate = useNavigate();

    async function HandleSignIn() {
        try {
            const response = await axios.post('http://localhost:7000/api/teacher/login', {
                Email: Email,
                Password: Password
            });
            localStorage.setItem('token', response.data.token);
            toast(response.data.msg);
            navigate('/Teacher');
        } catch (error) {
            toast(error.response?.data?.msg || error.message || "An error occurred");
            console.error('Error:', error.response?.data || error.message);
        }
    }
    return (
        <>
            <div className='animate__animated animate__fadeIn  w-full flex flex-col p-2 h-[100vh] overflow-y-auto gap-3 md:gap-10 bg-[#e8ebee] md:items-center'>
                <div className='md:w-[30%] w-full flex flex-row gap-2 '>
                    <IoMdArrowBack className='text-xl relative top-[3px] text-blue-500 ' />
                    <Link className='text-blue-500' to='/'>Back To Home</Link>
                </div>
                <div className='shadow-2xl bg-white min-h-[80%] flex-1 rounded-md flex flex-col gap-3 md:gap-6 items-center md:w-[30%]'>
                    <div className='w-full h-[15%] flex flex-row items-center justify-center'>
                        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-full p-4 inline-flex items-center justify-center">
                            <PiStudentThin className="text-5xl text-white" />
                        </div>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <h1 className='text-2xl font-bold'>Teacher Portal</h1>
                        <p className='text-gray-500 font-thin'>Sign in to access your teaching dashboard</p>
                    </div>
                    <div className='w-full flex flex-col p-3 gap-1 h-[40%] md:h-[32%] md:p-4'>
                        <label>Email Address</label>
                        <input
                            type="text"
                            className='border-2 border-gray-200 h-[30%] md:h-[35%] p-2 rounded-md'
                            placeholder='Teacher@school.edu'
                            value={Email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            className='border-2 border-gray-200 h-[30%] md:h-[35%] p-2 rounded-md'
                            placeholder='Enter Your Password'
                            value={Password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='h-[15%] flex flex-col w-[90%] md:w-[92%] justify-center items-center border-b-2 border-gray-300 pb-3'>
                        <button
                            className='border-2 border-blue-200 w-full h-[80%] rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200'
                            onClick={HandleSignIn}
                        >
                            Sign In
                        </button>
                        <ToastContainer />
                        <p className="text-sm mt-3">
                            Not a user?{' '}
                            <Link to="/TeacherRegister" className="text-blue-600 font-semibold hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                    <div className='text-center'>
                        <p>Need help accessing your account? <Link className='text-blue-600'>Contact IT support</Link></p>
                    </div>
                </div>
                <div className='md:w-[30%]'>
                    <img className='rounded-md ' src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" />
                </div>
            </div>
        </>
    )
}

export default Login;
