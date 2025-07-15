import React from 'react'
import { Navigate,useNavigate } from 'react-router-dom'
import 'animate.css'
import { useState } from 'react'
import { useEffect } from 'react'
const Navbar = () => {
        const navigate = useNavigate()
        const [loggedIn,setLoggedIn] = useState(false);
        useEffect(()=>{
                const token = localStorage.getItem('token');
                if (token) {
                        setLoggedIn(true);
                } else {
                        setLoggedIn(false);
                }
        })
return (
        <div className='w-full h-[70px] bg-white flex flex-row justify-between p-2 gap-2 shadow-xl md:p-3 backdrop-blur-large animate__animated animate__fadeInDown'>
                <div className=" text-xl bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text font-bold w-[30%] md:w-[50%] md:text-4xl">
                        <h1 className='md:ml-[70px]'>EduManage Pro</h1>
                </div>
                <div className="flex flex-row gap-2 w-[70%] md:w-[50%] ml-auto">
                        {!loggedIn ? (
                                <>
                                        <button
                                                onClick={() => { navigate('/Login') }}
                                                className='border-2 border-black bg-white rounded-md w-[70%] md:w-[30%] ml-auto hover:bg-gray-100 transition-all duration-200 hover:shadow-2xl'
                                        >
                                                Teacher Portal
                                        </button>
                                        <button
                                                onClick={() => { navigate('/StudentLogin') }}
                                                className='bg-gradient-to-r from-blue-600 to-green-500  text-white w-[70%] md:w-[30%] rounded-md shadow-md hover:opacity-90 transition-all duration-200 hover:shadow-2xl'
                                        >
                                                Student Portal
                                        </button>
                                </>
                        ) : (
                                <button
                                        onClick={() => {
                                                localStorage.removeItem('token');
                                                setLoggedIn(false);
                                                navigate('/');
                                        }}
                                        className='bg-gradient-to-r from-blue-600 to-green-500  text-white w-[70%] md:w-[30%] rounded-md shadow-md hover:opacity-90 transition-all duration-200 hover:shadow-2xl ml-auto'
                                >
                                        Logout
                                </button>
                        )}
                </div>
        </div>
)
}

export default Navbar