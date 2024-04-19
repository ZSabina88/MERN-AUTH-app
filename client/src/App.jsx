import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ErrorPage from './pages/Error';
import ProtectedRoutes from './components/ProtectedRoutes';
import UserProfile from './pages/UserProfile';
import axios from "axios";

axios.defaults.baseURL = "https://mern-auth-app-dmen.onrender.com";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />
  },
  {
    path: "/resetpassword/:token",
    element: <ResetPassword />
  },
  {
    path: "/userprofile",
    element: <UserProfile />
    // element: <ProtectedRoutes><UserProfile /></ProtectedRoutes>
  },

])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App;
