import React from 'react'
import Navbar from '../Components/navbar'
import { PiStudentThin } from "react-icons/pi";
import { PiBookOpenThin } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { PiMedalThin } from "react-icons/pi";
import { PiGraduationCapLight } from "react-icons/pi";
import { Navigate, useNavigate } from 'react-router-dom'
import 'animate.css';
const Home = () => {
  const navigate = useNavigate()
  const students = [
    { name: "Ayaan", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Sara", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Rohan", photo: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Meera", photo: "https://randomuser.me/api/portraits/women/50.jpg" },
    { name: "Aarav", photo: "https://randomuser.me/api/portraits/men/60.jpg" },
    // Add more students...
  ];
  return (
    <>
      <div className=' bg-gray-100 min-h-screen animate__animated animate__fadeIn'>
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Navbar />
        </div>

        <div className='mt-5 w-full flex flex-col justify-center items-center md:flex-row md:justify-around p-3 md:p-4 gap-5'>
          <div className='w-full flex flex-col gap-4'>
            <h1 className='text-5xl font-bold md:text-6xl'>Streamline <br />Your</h1>
            <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text md:text-6xl'>
              School<br />Management
            </h1>
            <p className='text-gray-400 md:text-2xl'>
              Empower educators, engage students, and enhance learning with our comprehensive school management platform.
            </p>
            <div className='flex flex-col gap-2 md:flex-row md:gap-3 md:w-[60%]'>
              <button className='text-white bg-blue-500 w-[80%] md:w-[50%] h-10 md:h-12 rounded-md hover:bg-blue-600 hover:shadow-2xl transition-all duration-200'>
                Get Started As Teacher
              </button>
              <button className='text-green-500 bg-white w-[80%] h-10 md:w-[40%] md:h-12 rounded-md border-2 border-green-500 hover:bg-green-100 hover:text-black hover:shadow-2xl transition-all duration-200'>
                Student Access
              </button>
            </div>
          </div>


          <div className="p-[2px] rounded-2xl bg-gradient-to-r from-blue-100 via-white to-green-100 shadow-xl w-full md:w-[45%] flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Student using laptop for online learning"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>

        <div className='w-full p-3 text-center'>
          <h1 className='text-3xl font-semibold'>Everything You Need In One Platform</h1>
          <p className='text-gray-400 text-2xl'>
            Comprehensive tools designed to make school management effortless and <br /> efficient.
          </p>
        </div>


        <div className='w-full flex flex-col md:flex-row md:justify-evenly p-6 bg-gray-50 gap-4'>
          {/* Card 1 */}
          <div className="w-full md:w-[22%] h-[350px] md:h-[300px] rounded-md bg-[#e5f0ff] flex flex-col items-center text-center gap-5 p-3 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className='bg-[#2a69ed] w-[25%] h-[30%] md:w-[30%] md:h-[35%] rounded-full flex items-center justify-center'>
              <PiStudentThin className='text-5xl text-white' />
            </div>
            <h1 className='text-4xl font-semibold'>Student Management</h1>
            <p className='text-gray-400  text-2xl'>Track attendance, grades, and student progress with comprehensive analytics.</p>
          </div>

          {/* Card 2 */}
          <div className="w-full md:w-[22%] h-[350px] md:h-[300px] rounded-md bg-[#e6fded] flex flex-col items-center text-center gap-5 p-3 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className='bg-[#18a84d] w-[25%] h-[30%] md:w-[30%] md:h-[35%] rounded-full flex items-center justify-center'>
              <PiBookOpenThin className='text-5xl text-white' />
            </div>
            <h1 className='text-4xl font-semibold'>Curriculum Planner</h1>
            <p className='text-gray-400 text-2xl'>Organize lessons and subjects efficiently with tailored curriculum tools.</p>
          </div>

          {/* Card 3 */}
          <div className="w-full md:w-[22%] h-[350px] md:h-[300px] rounded-md bg-[#f5edff] flex flex-col items-center text-center gap-5 p-3 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className='bg-[#9638ec] w-[25%] h-[30%] md:w-[30%] md:h-[35%] rounded-full flex items-center justify-center'>
              <SlCalender className='text-5xl text-white' />
            </div>
            <h1 className='text-4xl font-semibold'>Event Scheduling</h1>
            <p className='text-gray-400 text-2xl'>Manage exams, holidays, and events with the integrated calendar system.</p>
          </div>

          {/* Card 4 */}
          <div className="w-full md:w-[22%] h-[350px] md:h-[300px] rounded-md bg-[#ffefdb] flex flex-col items-center text-center gap-5 p-3 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className='bg-[#ed5d0e] w-[25%] h-[30%] md:w-[30%] md:h-[35%] rounded-full flex items-center justify-center'>
              <PiMedalThin className='text-5xl text-white' />
            </div>
            <h1 className='text-4xl font-semibold'>Performance Analytics</h1>
            <p className='text-gray-400 text-2xl'>Get insights on academic performance and student behavior over time.</p>
          </div>
        </div>
        <div className="w-full bg-white py-6 overflow-hidden relative">
          <div className="flex animate-marquee gap-6 whitespace-nowrap">
            {students.map((student, index) => (
              <div
                key={index}
                className="min-w-[200px]  bg-gray-100 rounded-xl shadow-md p-4 flex items-center gap-4"
              >
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-gray-800 font-medium">{student.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className=' h-[500px] md:h-[400px] space-y-4 flex flex-col bg-gradient-to-r from-blue-600 via-teal-500 to-green-600 py-16 md:py-5 text-center px-4'>
          <h1 className='text-5xl text-white font-bold'>Ready to <br /> Transform Your <br /> School?</h1>
          <p className='text-xl md:text-2xl text-gray-300 font-thin'>Join thousands of educators who trust EduManage Pro for their school management needs.</p>
          <div className='flex flex-col h-[30%] gap-4 md:flex-row md:items-center md:justify-center'>
            <button onClick={() => { navigate('/Login') }} className='bg-white text-blue-500 rounded-md h-[40%] md:w-[15%] hover:bg-gray-200 transition-all duration-200'>
              Teacher Sign In
            </button>
            <button onClick={() => { navigate('/StudentLogin') }} className='bg-white text-blue-500 rounded-md h-[40%] md:w-[15%] hover:bg-transparent hover:border hover:border-white hover:text-black transition-all duration-200'>
              Student Sign In
            </button>
          </div>
        </div>
        <div className='w-full h-[200px] bg-[#111827] flex flex-col text-center justify-center items-center gap-2'>
          <div className='flex flex-row gap-3'>
            <div className="bg-gradient-to-r from-blue-600 to-green-500 w-10 h-10 rounded-xl flex items-center justify-center">
              <PiGraduationCapLight className="text-white text-3xl" />
            </div>
            <h1 className='text-3xl text-white'>EduManage Pro</h1>
          </div>
          <p className='text-gray-300'>© 2024 EduManage Pro. Empowering education through technology.</p>
        </div>
      </div>
    </>
  )
}

export default Home
