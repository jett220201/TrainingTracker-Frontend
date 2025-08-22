import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import PublicLayout from './layouts/PublicLayout.tsx'
import PrivateLayout from './layouts/PrivateLayout.tsx'
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import Home from './pages/Home.tsx';
import Workouts from './pages/Workouts.tsx';
import NewWorkout from './pages/NewWorkout.tsx';
import Goals from './pages/Goals.tsx';
import NewGoal from './pages/NewGoal.tsx';
import Progress from './pages/Progress.tsx';
import Exercises from './pages/Exercises.tsx';
import Profile from './pages/Profile.tsx';
import Settings from './pages/Settings.tsx';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ]
  },
  {
    element: <PrivateLayout />,
    children: [
      { path: "/app/home", element: <Home /> },
      { path: "/app/workouts", element: <Workouts /> },
      { path: "/app/workouts/new", element: <NewWorkout /> },
      { path: "/app/goals", element: <Goals /> },
      { path: "/app/goals/new", element: <NewGoal /> },
      { path: "/app/progress", element: <Progress /> },
      { path: "/app/exercises", element: <Exercises /> },
      { path: "/app/profile", element: <Profile /> },
      { path: "/app/settings", element: <Settings /> },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
