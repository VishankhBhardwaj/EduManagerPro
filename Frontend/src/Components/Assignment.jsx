import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { FileText, Download, Clock, Calendar } from 'lucide-react'
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

const Assignment = ({ setAssignmentWindow, scheduleData }) => {
    const [files, setFiles] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const extractFileName = (fullPath) => {
        return fullPath.split('Uploads\\Assignments\\')[1];
    };
    const handleFileChange = (e) => {

        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setFiles([...files, ...newFiles])
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
                'http://localhost:7000/api/showStudentData/uploadAssignment',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            toast.success(res.data.msg);
            if (res.data.msg) {
                setFiles([]);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        async function fetchAssignment() {
            try {
                const res = await axios.post('http://localhost:7000/api/showStudentData/assignments', { scheduleId: scheduleData._id });
                if (res) {
                    setAssignments(res.data.data.assignments);
                }
                console.log(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchAssignment();
    }, [])
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row w-full justify-between'>
                <div>
                    <div className='flex flex-row'>
                        <IoMdArrowBack className='text-xl relative top-[3px] text-blue-500 ' />
                        <button onClick={() => setAssignmentWindow(false)} className='text-blue-500'>Back</button>
                    </div>
                    <h1 className='font-bold text-xl'>{`${scheduleData.SubjectName} - Attendance`}</h1>
                    <p className='text-md text-gray-400'>{`${scheduleData.Day}, ${scheduleData.StartTime} - ${scheduleData.EndTime}`}</p>
                </div>
            </div>
            <div className='flex flex-col  p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn '>
                <div className='w-full h-[20%] flex flex-col md:justify-between md:p-3 '>
                    <div className='w-full '>
                        <h1 className='font-bold text-2xl md:text-3xl'>Notes and Assignment</h1>
                        <p className='text-lg text-gray-400 md:text-2xl'>Your weekly teaching notes and assignment</p>
                    </div>
                    <p>Please complete the following assignment and submit your work before the deadline</p>
                    <div>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-900">Teacher Materials</h2>
                            <div className="mt-4 space-y-3">
                                {assignments.map((assignment) => (
                                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <FileText className='text-blue-500'/>
                                            <div>
                                                <p className="font-medium text-gray-800">{assignment.description}</p>
                                            </div>
                                        </div>
                                        <a href={`http://localhost:7000/public/Uploads/Assignments/${extractFileName(assignment.file)}`}>
                                            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                                                <Download size={16} />
                                                <span>Download</span>
                                            </button>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <h2 className="text-lg font-semibold mb-3 mt-5">Submit Your Assignment</h2>
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
                                    <div><button onClick={handleFileUpload} className='bg-black text-white px-4 py-2 rounded-md cursor-pointer inline-block animate__animated animate__fadeIn'>Upload Files</button>
                                        <ToastContainer /></div>
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
                </div>
            </div>
        </div>
    )
}

export default Assignment