import React from 'react'
import { FaRegTrashCan } from "react-icons/fa6";

const MyStudents = () => {
    const students = [
        {
            id: "STU2024002",
            name: "Emma Davis",
            grade: "Grade 11",
            email: "emma.davis@school.edu",
            courses: ["Advanced Mathematics", "Statistics"],
        },
        {
            id: "STU2024003",
            name: "Michael Brown",
            grade: "Grade 10",
            email: "michael.brown@school.edu",
            courses: ["Mathematics", "Calculus"],
        },
        {
            id: "STU2024004",
            name: "Lisa Wilson",
            grade: "Grade 12",
            email: "lisa.wilson@school.edu",
            courses: ["Calculus", "Statistics"],
        },
    ];
    return (
        <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
            <div className="bg-white rounded-xl shadow p-6  mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">My Students</h1>
                        <p className="text-gray-500 text-sm">Students under your supervision</p>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-800">
                        <span className="text-xl mr-2">+</span> Add Student
                    </button>
                </div>

                <div className="grid grid-cols-5 font-semibold text-gray-500 border-b pb-2 mb-2">
                    <div>Student</div>
                    <div>Grade</div>
                    <div>Email</div>
                    <div>Courses</div>
                    <div className="text-center">Actions</div>
                </div>
                {students.map((student) => (
                    <div key={student.id} className="grid grid-cols-5 items-center py-4 border-b">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200" />
                            <div>
                                <div className="font-semibold text-gray-900">{student.name}</div>
                                <div className="text-xs text-gray-500">{student.id}</div>
                            </div>
                        </div>
                        <div>{student.grade}</div>
                        <div className="text-sm">{student.email}</div>
                        <div className="flex flex-wrap gap-2">
                            {student.courses.map((course, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-sm px-2 py-1 rounded-full text-gray-700"
                                >
                                    {course}
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg">
                                <FaRegTrashCan />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyStudents