import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import StudentLogin from './Pages/StudentLogin'
import TeacherRegister from './Pages/TeacherRegister'
import StudentRegister from './Pages/StudentRegister'
import Student from './Pages/Dashboard/Student/Student'
import Teacher from './Pages/Dashboard/Teacher/Teacher'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }, {
    path: '/Login',
    element: <Login />
  },
  {
    path: "/StudentLogin",
    element: <StudentLogin />
  },
  {
    path: 'TeacherRegister',
    element: <TeacherRegister />
  },
  {
    path: 'StudentRegister',
    element: <StudentRegister />
  },
  {
    path: 'Student',
    element: <Student />
  },
  {
    path: 'Teacher',
    element: <Teacher />
  }
])
function App() {


  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
