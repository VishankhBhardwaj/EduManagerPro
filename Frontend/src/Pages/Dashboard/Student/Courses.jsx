import React from 'react'
import {useState, useEffect} from 'react'
import 'animate.css'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
    const [loading, setLoading] = useState(false);

    // Fetch current student subjects on component mount
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:7000/api/showStudentData/studentData', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                console.log('Student data response:', response.data); // Debug log
                
                // Set current subjects if they exist
                // The response.data is the student object directly
                if (response.data.Subjects && response.data.Subjects.length > 0) {
                    // Subjects is an array of arrays, so get the first array
                    const currentSubjects = response.data.Subjects[0] || [];
                    setSelectedCourses(Array.isArray(currentSubjects) ? currentSubjects : []);
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
                // Don't show error toast immediately, just log it
                // The user might not have any subjects set yet
                console.log('No existing subjects found or error loading data');
            }
        };
        
        fetchStudentData();
    }, []);

    const handleCourseChange = (course) => {
        if (selectedCourses.includes(course)) {
            // Remove if already selected
            setSelectedCourses(selectedCourses.filter(c => c !== course));
        } else {
            // Add new course
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const handleUpdateCourses = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:7000/api/student/update-subjects',
                { subjects: [selectedCourses] }, // Wrapping in array as per schema
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            toast.success(response.data.msg || 'Courses updated successfully!');
        } catch (error) {
            console.error('Error updating courses:', error);
            toast.error(error.response?.data?.msg || 'Failed to update courses');
        } finally {
            setLoading(false);
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
                <button 
                    onClick={handleUpdateCourses}
                    disabled={loading}
                    className={`w-full h-[40px] md:w-[40%] text-white rounded-lg transition-all duration-200 ${
                        loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-black hover:bg-gray-800'
                    }`}
                >
                    {loading ? 'Updating...' : 'Update Course Selection'}
                </button>
            </div>
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Courses