import { useReducer, useEffect } from 'react';
import AuthContext from '../context/Auth-context';
import AuthReducer from '../reducer/Auth-Reducer.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import axios from '../config/axios.js';

const initialValue = {
  isLoggedIn: false,
  user: null,
};

export default function AuthProvider(props) {
  const [state, dispach] = useReducer(AuthReducer, initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        try {
          const response = await axios.get(
            '/api/user/profile',
            {
              headers: { Authorization: localStorage.getItem('token') },
            }
          );
          console.log(response.data);
          dispach({ type: 'LOGIN', payload: response.data });
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, []);

  const handleLogin = async formData => {
    try {
      const response = await axios.post(
        '/api/user/login',
        formData
      );
      localStorage.setItem('token', response.data.token);
      dispach({ type: 'LOGIN', payload: response.data.user });
      navigate('/profile');
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Display the backend error message in an alert
        toast.error(error.response.data.message);
      } else {
        // Handle other unexpected errors
        alert('An error occurred. Please try again.');
      }
    }
  };

  const handleRegister = async formData => {
    try {
      const response = await axios.post(
        '/api/user/register',
        formData
      );
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      dispach({ type: 'LOGIN', payload: response.data.user });
      navigate('/profile');
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data.message) {
        // Display the backend error message in an alert
        toast.error(error.response.data.message);
      } else {
        // Handle other unexpected errors
        alert('An error occurred. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    dispach({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    navigate('/login');
    toast.success('Loggedout successfully');
  };

  return (
    <AuthContext.Provider
      value={{ ...state, dispach, handleLogin, handleLogout, handleRegister }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
