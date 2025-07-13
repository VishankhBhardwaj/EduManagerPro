import React from 'react'
import 'animate.css'
const TeacherSchedule = () => {
    const schedule = [
        {
            Day: 'Monday',
            Subjects: [
                'Mathematics (9:00 AM)',
                'English Literature (11:00 AM)',
                'Physics (2:00 PM)'
            ]
        },
        {
            Day: 'Tuesday',
            Subjects: [
                'Chemistry (9:00 AM)',
                'History (11:00 AM)',
                'Biology (2:00 PM)'
            ]
        },
        {
            Day: 'Wednesday',
            Subjects: [
                'Geography (9:00 AM)',
                'Computer Science (11:00 AM)',
                'Art (2:00 PM)'
            ]
        },
        {
            Day: 'Thursday',
            Subjects: [
                'Music (9:00 AM)',
                'Physical Education (11:00 AM)',
                'Mathematics (2:00 PM)'
            ]
        },
        {
            Day: 'Friday',
            Subjects: [
                'English Literature (9:00 AM)',
                'Chemistry (11:00 AM)',
                'Computer Science (2:00 PM)'
            ]
        }
    ];
    return (
        <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
            <div className='w-full h-[20%] flex flex-row md:justify-between md:p-3'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl'>Teaching Schedule</h1>
                    <p className='text-lg text-gray-400 md:text-2xl'>Your weekly teaching schedule</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-2 bg-white rounded-lg shadow-md w-full md:p-4">
                {schedule.map((daySchedule, index) => (
                    <div key={index} className='w-full border-2 border-gray-200 p-3 rounded-lg'>
                        <h1 className="text-xl font-semibold">{daySchedule.Day}</h1>
                        {daySchedule.Subjects.map((subject, subIndex) => (
                            <p key={subIndex} className="text-gray-400">
                                {subject}
                            </p>
                        ))}
                    </div>
                ))}
            </div>


        </div>
    )
}

export default TeacherSchedule