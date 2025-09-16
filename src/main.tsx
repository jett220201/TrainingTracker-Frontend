import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import PublicLayout from './layouts/PublicLayout.tsx'
import PrivateLayout from './layouts/PrivateLayout.tsx'
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import RecoveryPassword from './pages/RecoveryPassword.tsx';
import PrivacyTerms from './pages/PrivacyTerms.tsx';
import Home from './pages/Home.tsx';
import Workouts from './pages/Workouts.tsx';
import NewWorkout from './pages/NewWorkout.tsx';
import Goals from './pages/Goals.tsx';
import NewGoal from './pages/NewGoal.tsx';
import Progress from './pages/Progress.tsx';
import Exercises from './pages/Exercises.tsx';
import Profile from './pages/Profile.tsx';
import Settings from './pages/Settings.tsx';
import About from './pages/About.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './api/apolloClient.ts';
import ErrorPage from './pages/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/recovery-password", element: <RecoveryPassword /> },
      { path: "/privacy-terms", element: <PrivacyTerms /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  },
  {
    element: <PrivateLayout />,
    errorElement: <ErrorPage />,
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
      { path: "/app/about", element: <About /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
)
