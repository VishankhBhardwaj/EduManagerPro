import React from 'react'
import {useState} from 'react'
import 'animate.css'
const Courses = () => {
    const allCourses = [
        "Mathematics",
        "English Literature",
        "Physics",
        "Chemistry",
        "Biology",
        "History",
        "Geography",
        "Computer Science",
        "Art",
        "Music",
        "Physical Education",
        "Spanish"
    ]
    const [selectedCourses, setSelectedCourses] = useState([]);

    const handleCourseChange = (course) => {
        if (selectedCourses.includes(course)) {
            // Remove if already selected
            setSelectedCourses(selectedCourses.filter(c => c !== course));
        } else {
            // Add new course
            setSelectedCourses([...selectedCourses, course]);
        }
    };
    return (
        <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn '>
            <div className='w-full h-[20%] flex flex-row md:justify-between'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl'>Course Selection</h1>
                    <p className='text-lg text-gray-400 md:text-2xl'>Select the course you want to enroll in</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md w-full">
                <h1 className='text-md'>Currently Enroll Courses</h1>
                <div className='flex flex-row w-full'>
                    <ul className='w-full flex flex-row flex-wrap gap-3'>
                        {selectedCourses.length > 0 ? (
                            selectedCourses.map((course, index) => (
                                <li key={index} className='bg-black text-white text-center px-2 rounded-xl text-xs'>
                                    {course}
                                </li>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">No courses selected yet.</p>
                        )}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col  gap-4 p-4 bg-white rounded-lg shadow-md w-full">
                <h1>Available Courses</h1>
                <div className='flex flex-col space-y-2'>
                    {allCourses.map((course, index) => (
                        <label key={index} className="flex items-center gap-2">
                            <input
                                checked={selectedCourses.includes(course)}
                                onChange={() => handleCourseChange(course)}
                                type="checkbox" className=" w-4 h-4 accent-black transition-all duration-200" />
                            <span>{course}</span>
                        </label>
                    ))}
                </div>
                <button className='w-full bg-black h-[40px] md:w-[40%] text-white rounded-lg'>Update Course Selection</button>
            </div>
        </div>
    )
}

export default Courses