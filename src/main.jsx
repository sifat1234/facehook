import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';

import { AuthProvider } from './providers/AuthProvider.jsx';

import PrivateRoutes from './routes/PrivateRoutes.jsx';

// Define routes
const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/registration', element: <RegistrationPage /> },

  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/me', element: <ProfilePage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
