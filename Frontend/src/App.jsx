import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import StudentLogin from './Pages/StudentLogin'
import TeacherRegister from './Pages/TeacherRegister'
import StudentRegister from './Pages/StudentRegister'
import Student from './Pages/Dashboard/Student/Student'
import Teacher from './Pages/Dashboard/Teacher/Teacher'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Protected Route Component
const ProtectedRoute = ({ children, redirectTo }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to={redirectTo} replace />;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Listen for storage changes to update token state
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case localStorage was updated in the same tab
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken !== token) {
        setToken(currentToken);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [token]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    }, {
      path: '/Login',
      element: token ? <Navigate to="/Teacher" replace /> : <Login />
    },
    {
      path: "/StudentLogin",
      element: token ? <Navigate to="/Student" replace /> : <StudentLogin />
    },
    {
      path: 'TeacherRegister',
      element: token ? <Navigate to="/Teacher" replace /> : <TeacherRegister />
    },
    {
      path: 'StudentRegister',
      element: token ? <Navigate to="/Student" replace /> : <StudentRegister />
    },
    {
      path: '/Student',
      element: (
        <ProtectedRoute redirectTo="/StudentLogin">
          <Student />
        </ProtectedRoute>
      )
    },
    {
      path: '/Teacher',
      element: (
        <ProtectedRoute redirectTo="/Login">
          <Teacher />
        </ProtectedRoute>
      )
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
