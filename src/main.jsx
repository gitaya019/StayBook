import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfile';
import HotelProfilePage from './pages/HotelProfile';
import NotFoundPage from './pages/NotFoundPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './styles/App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/user-profile',
    element: (
      <ProtectedRoute userType="Usuario">
        <UserProfilePage />
      </ProtectedRoute>
    )
  },
  {
    path: '/hotel-profile',
    element: (
      <ProtectedRoute userType="Hotel">
        <HotelProfilePage />
      </ProtectedRoute>
    )
  },
  {
    path: '/terms',
    element: <TermsPage />
  },
  {
    path: '/privacy',
    element: <PrivacyPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
