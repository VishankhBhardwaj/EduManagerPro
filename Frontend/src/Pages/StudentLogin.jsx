import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { PiStudentThin } from "react-icons/pi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'animate.css';

const StudentLogin = () => {
    const navigate = useNavigate();
    const [forgetPassword, setForgetPassword] = useState(false);
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');


    async function HandleSignIn() {
        try {
            const response = await axios.post('http://localhost:7000/api/student/login', {
                Email: Email,
                Password: Password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('student', true);
            toast(response.data.message);
            navigate('/Student')
        } catch (error) {
            toast(error.response?.data?.msg || error.message || "An error occurred");
            console.error('Error:', error.response?.data || error.message);
        }
    }
    async function handleForget() {
        try {
            const response = await axios.post('http://localhost:7000/api/student/recovery', {
                Email: Email
            });
            toast(response.data.msg);
            setTimeout(() => {
                setForgetPassword(false);
            }, 2000);
            navigate('/');
        } catch (error) {
            toast(error.response?.data?.msg || error.message || "An error occurred");
            console.error('Error:', error.response?.data || error.message);
        }
    }
    return (
        <>
            <div className='animate__animated animate__fadeIn  w-full flex flex-col p-2 h-[100vh] overflow-y-auto gap-3 md:gap-10 bg-[#e8ebee] md:items-center'>
                <div className='md:w-[30%] w-full   flex flex-row gap-2 '>
                    <IoMdArrowBack className='text-xl relative top-[3px] text-blue-500 ' />
                    <Link className='text-blue-500' to='/' onClick={() => setForgetPassword(false)}>Back To Home</Link>
                </div>
                <div className={`${forgetPassword ? "hidden" : ""} shadow-2xl bg-white min-h-[80%] flex-1 rounded-md flex flex-col gap-3 md:gap-6 items-center md:w-[30%]`}>
                    <div className='w-full h-[15%] flex flex-row items-center justify-center'>
                        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-full p-4 inline-flex items-center justify-center">
                            <PiStudentThin className="text-5xl text-white" />
                        </div>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <h1 className='text-2xl font-bold'>Student Portal</h1>
                        <p className='text-gray-500 font-thin'>Sign in to access your learning dashboard</p>
                    </div>
                    <div className='w-full flex flex-col p-3 gap-1 h-[40%] md:h-[32%] md:p-4'>
                        <label htmlFor="">Student ID</label>
                        <input
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text" className='border-2 border-gray-200 h-[30%] md:h-[35%] p-2 rounded-md' placeholder='Enter Your Student Id' />
                        <label htmlFor="">Password</label>
                        <input
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" className='border-2 border-gray-200 h-[30%] md:h-[35%] p-2 rounded-md' placeholder='Enter Your Password' />
                    </div>
                    <div className='h-[15%] flex flex-col w-[90%] md:w-[92%] justify-center items-center border-b-2 border-gray-300 pb-3'>
                        <button
                            onClick={HandleSignIn}
                            className=' w-[100%] h-[80%] rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-200'>
                            Sign In
                        </button>
                        <ToastContainer />
                        <p className="text-sm mt-3">
                            Not a student?{' '}
                            <Link to="/StudentRegister" className="text-green-700 font-semibold hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                    <div className='text-center'>
                        <p>Forget Your Password? <Link className='text-green-700 hover:underline transition-all duration-200' onClick={() => setForgetPassword(true)}>Reset Password</Link></p>
                    </div>
                </div>
                {/* here */}
                <div className={`${forgetPassword ? "block" : "hidden"} shadow-2xl bg-white min-h-[350px] md:h-[1000px] flex flex-col gap-4 items-center md:w-[30%] p-4 rounded-md`}>

                    <div className='w-full flex justify-center'>
                        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-full p-4 inline-flex items-center justify-center">
                            <PiStudentThin className="text-5xl text-white" />
                        </div>
                    </div>

                    <div className='text-center'>
                        <h1 className='text-2xl font-bold'>Student Portal</h1>
                        <p className='text-gray-500 font-thin'>Sign in to access your learning dashboard</p>
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="">Student ID/Email ID</label>
                        <input
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text" className='border border-gray-300 p-2 rounded-md' placeholder='Enter Your Student Id' />
                    </div>
                    <div className='w-full border-t pt-4'>
                        <button onClick={handleForget} className='w-full py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-200'>
                            Submit
                        </button>
                        <ToastContainer />
                    </div>
                </div>

                <div className='md:w-[30%]'>
                    <img className='rounded-md ' src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="" />
                </div>
            </div>
        </>
    )
}

export default StudentLogin;
