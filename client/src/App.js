import React, { useContext } from 'react';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import NavPages from './components/navPages/NavPages';

import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import './style.scss';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatBox from './components/chatBox/ChatBox';
import Advice from './components/advice/Advice'; 

const queryClient = new QueryClient();

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
          <Navbar />
          <NavPages />
          <div style={{ display: 'flex', flexGrow: 1 }}>
            <div style={{ flex: 6 }}>{children}</div>
          </div>
        </div>
      </QueryClientProvider>
    );
  };


  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout>
            <Outlet />
          </Layout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/chatBox',
      element: (
        <QueryClientProvider client={queryClient}>
          <Layout>
            <ChatBox chatRoomId={1} currentUser={currentUser} />
          </Layout>
        </QueryClientProvider>
      ),
    },
    {
      path: '/advice', 
      element: (
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Advice/>
          </Layout>
        </QueryClientProvider>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
