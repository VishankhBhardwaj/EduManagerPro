import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import {
    ArrowLeft,
    CheckCircle,
    X,
    Upload,
    File,
    CheckCircle2,
    XCircle,
} from 'lucide-react'
import axios from 'axios';
const Attendance = ({ setattendanceWindow, scheduleData }) => {
    let [present, setPresent] = useState(0);
    let [absent, setAbsent] = useState(0);
    const [files, setFiles] = useState([]);

    const [request, setRequest] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState({});
    const handleFileChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles([...files, ...newFiles]);
        }
    }
    const handleRemoveFile = (index) => {
        setFiles(files.filter((_, i) => i !== index))
    }
    const handleFileUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("schedule", scheduleData._id);
            files.forEach(file => {
                formData.append("files", file);
            });
            const res = await axios.post(
                'http://localhost:7000/api/requests/uploadAssignment',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            toast(res.data.msg);
            if (res.data.msg) {
                setFiles([]);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleAll = (isChecked) => {
        const accepted = request.filter((data) => data.status === 'accepted');
        if (isChecked) {
            accepted.forEach((data) => {
                markAttendance(data.studentId._id, 'present');
            });
        } else {
            accepted.forEach((data) => {
                markAttendance(data.studentId._id, 'absent');
            });
        }
    };


    const markAttendance = (studentId, status) => {
        setAttendanceRecords(prev => {
            const newRecords = { ...prev };
            if (newRecords[studentId] && newRecords[studentId] !== status) {
                const previousStatus = newRecords[studentId];

                if (previousStatus === 'present') setPresent(p => p - 1);
                else if (previousStatus === 'absent') setAbsent(a => a - 1);
            }
            newRecords[studentId] = status;

            if (status === 'present') setPresent(p => p + 1);
            else if (status === 'absent') setAbsent(a => a + 1);
            return newRecords;
        });
    };


    useEffect(() => {
        console.log(scheduleData)
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
        fetchRequests();
    }, [])

    const handleSaveAttendance = async () => {
        const attendancePayload = {
            schedule: scheduleData._id,
            records: Object.entries(attendanceRecords).map(([studentId, status]) => ({
                student: studentId,
                status
            }))
        };

        try {
            await axios.post('http://localhost:7000/api/attendance/mark', attendancePayload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            await axios.put('http://localhost:7000/api/requests/setAttendance', { scheduleId: scheduleData._id });
            alert('Attendance saved successfully!');
            setattendanceWindow(false);
        } catch (error) {
            console.error("Failed to save attendance:", error);
            alert('Failed to save attendance.');
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row w-full justify-between'>
                <div>
                    <div className='flex flex-row'>
                        <IoMdArrowBack className='text-xl relative top-[3px] text-blue-500 ' />
                        <button onClick={() => setattendanceWindow(false)} className='text-blue-500'>Back To Home</button>
                    </div>
                    <h1 className='font-bold text-xl'>{`${scheduleData.SubjectName} - Attendance`}</h1>
                    <p className='text-md text-gray-400'>{`${scheduleData.Day}, ${scheduleData.StartTime} - ${scheduleData.EndTime}`}</p>
                </div>
                <button onClick={handleSaveAttendance} className='text-sm flex-nowrap  bg-blue-500 rounded-md md:w-[20%] cursor-pointer'>Save Attendence</button>
            </div>
            <div className='flex flex-col  p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn '>
                <div className='w-full h-[20%] flex flex-col md:justify-between md:p-3 '>
                    <div className='w-full '>
                        <h1 className='font-bold text-2xl md:text-3xl'>Attendance Summary</h1>
                        <p className='text-lg text-gray-400 md:text-2xl'>Your weekly teaching schedule</p>
                    </div>
                    <div className=' h-[200px] p-2 flex flex-col md:flex-row md:justify-start gap-2'>
                        <div className=' h-[30%] flex flex-row p-2 justify-between bg-[#f0fdf4] rounded-md md:h-[100%] md:w-[20%]'>
                            <div className='flex flex-row gap-3'>
                                <h1 className='text-green-600 md:text-3xl'>Present</h1>
                                <div className='w-5 h-5 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-green-100'>
                                    <svg
                                        className="w-6 h-6 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>

                            </div>
                            <h1 className='font-bold'>{present}</h1>
                        </div>
                        <div className=' h-[30%] flex flex-row p-2 justify-between bg-[#fef2f2] rounded-md md:h-[100%] md:w-[20%]'>
                            <div className='flex flex-row gap-3'>
                                <h1 className='text-red-600 md:text-3xl'>Absent</h1>
                                <div className='w-5 h-5 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#fef2f2]'>
                                    <svg
                                        className="w-6 h-6 group-hover:text-red-600 transition-all duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                            <h1 className='font-bold'>{absent}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg  border p-6 mb-8 shadow-2xl">
                <h2 className="text-xl font-bold mb-4">Upload Files for Students</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                    <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 mb-2">
                        Drag and drop files here or click to browse
                    </p>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                    />
                    <div className='flex flex-row gap-3 w-full justify-around md:justify-center'>
                        <label
                            htmlFor="file-upload"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer inline-block"
                        >
                            Browse Files
                        </label>
                        {files.length > 0 && (
                            <button onClick={handleFileUpload} className='bg-black text-white px-4 py-2 rounded-md cursor-pointer inline-block animate__animated animate__fadeIn'>Upload Files</button>
                        )}
                    </div>
                </div>
                {files.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="font-medium text-gray-700">Selected Files:</h4>
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 border rounded-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <File size={20} className="text-blue-600" />
                                    <span>{file.name}</span>
                                </div>
                                <button
                                    onClick={() => handleRemoveFile(index)}
                                    className="text-red-500"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='flex flex-row p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn md:w-[10%]'>
                <input type="checkbox" onChange={(e) => { handleAll(e.target.checked); document.getElementById('name').style.textDecoration = 'line-through' }} />
                <span>Select All</span>
            </div>
            <div className=' min-h-screen flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
                <div className="grid grid-cols-3 grid-row-1 font-semibold text-gray-500 border-b pb-2 mb-2">
                    <div className="text-center">Roll Number</div>
                    <div className="text-center">Student Name</div>
                    <div className="text-center">Attendance</div>
                </div>
                {
                    request.filter((data) => data.status === 'accepted').map((data, index) => (
                        <div className='flex flex-row grid-row-1 w-full  justify-around items-center border-b border-gray-400 pb-2' key={index}>
                            <div className='text-center'>{data.studentId._id.substring(0, 3)}</div>
                            <div className='text-center' id='name'>{data.studentId.FullName}</div>
                            <div className='flex flex-row  w-[30%] md:w-[15%] items-center justify-around mr-[-17px]  md:mr-[-137px]'>
                                <div onClick={() => {
                                    markAttendance(data.studentId._id, 'present')
                                    document.getElementById('name').style.textDecoration = 'line-through'
                                }} className="w-5 h-5 md:w-10 md:h-10 flex items-center justify-center group bg-gray-200 rounded-full hover:bg-green-100 transition-all duration-200 cursor-pointer">
                                    <svg
                                        className="w-6 h-6 group-hover:text-green-500 transition-all duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <div onClick={() => {
                                    markAttendance(data.studentId._id, 'absent')
                                    document.getElementById('name').style.textDecoration = 'line-through'
                                }} className="w-5 h-5 md:w-10 md:h-10 flex items-center justify-center group bg-gray-200 rounded-full hover:bg-[#fef2f2] transition-all duration-200 cursor-pointer">
                                    <svg
                                        className="w-6 h-6 group-hover:text-red-600 transition-all duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Attendance