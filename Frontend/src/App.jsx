import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import StudentLogin from './Pages/StudentLogin'
import TeacherRegister from './Pages/TeacherRegister'
import StudentRegister from './Pages/StudentRegister'
const router=createBrowserRouter([
  {
    path:'/Home',
    element:<Home />
  },{
    path:'/Login',
    element:<Login />
  },
  {
    path:"/StudentLogin",
    element:<StudentLogin />
  },
  {
    path:'TeacherRegister',
    element:<TeacherRegister/>
  },
  {
    path:'StudentRegister',
    element:<StudentRegister/>
  }
])
function App() {


  return (
   <>
        <RouterProvider router={router} />

   </>
  )
}

export default App
