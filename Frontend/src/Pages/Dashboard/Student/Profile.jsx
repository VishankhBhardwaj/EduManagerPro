import {React,useState} from 'react'
import 'animate.css'
const Profile = () => {
    const [isEditable, setIsEditable] = useState(false);
    return (
        <div className='flex flex-col p-3 gap-4 w-full h-full bg-white rounded-md shadow-2xl animate__animated animate__fadeIn'>
            <div className='w-full h-[20%] flex flex-row md:justify-between'>
                <div>
                    <h1 className='font-bold text-2xl md:text-3xl'>Personal Information</h1>
                    <p className='text-xl text-gray-400 md:text-2xl'>view and update your peronal details</p>
                </div>
                <div className='p-5'>
                    <button onClick={() => setIsEditable(!isEditable)} className={`border-2 rounded-md w-[100px] h-[50px] transition-all duration-200 ${isEditable ? 'bg-blue-500 text-white w-[150px]' : 'bg-white text-black'}`}>{isEditable ? 'Save' : 'Edit'}</button>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md w-full">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    {/* Optional: initials or icon */}
                </div>
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">John Smith</h2>
                    <span className="bg-gray-100 text-sm font-semibold text-black px-3 py-1 rounded-full w-fit mt-1">
                        Grade 10
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                        Student ID: <span className="font-medium">STU2024001</span>
                    </p>
                </div>
            </div>
            <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md w-full'>
                <div className='w-full flex flex-col md:flex-row md:gap-2'>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Full Name</label>
                        <input readOnly={!isEditable} type="text" placeholder='John Smith' className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Email</label>
                        <input readOnly={!isEditable} type="text" placeholder='John.Smith@school.edu' className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row md:gap-2'>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Phone</label>
                        <input readOnly={!isEditable} type="text" placeholder='+1(555)123-4567' className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Date of Birth</label>
                        <input readOnly={!isEditable} type="text" placeholder='05/15/2008' className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row md:gap-2'>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Guardian Name</label>
                        <input readOnly={!isEditable} type="text" placeholder='Jahn Smith' className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Grade</label>
                        <select disabled={!isEditable} className={`h-[40px] p-2 bg-white border-2 border-gray-200 rounded-md ${isEditable?"cursor-pointer":"cursor-not-allowed"} `}>
                            <option value="">Select Grade</option>
                            <option value="9">Grade 9</option>
                            <option value="10">Grade 10</option>
                            <option value="11">Grade 11</option>
                            <option value="12">Grade 12</option>
                        </select>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="" className='font-bold'>Address</label>
                    <input readOnly={!isEditable} type="text" placeholder='XYZ' className={`${isEditable?"cursor-pointer":"cursor-not-allowed"} border-2 border-gray-200 h-[40px] p-2 rounded-md`} />
                </div>
            </div>
        </div>
    )
}

export default Profile