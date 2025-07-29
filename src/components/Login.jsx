import {Box, CircularProgress, Stack, Button, TextField, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import "./Login.css";
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Getting the API URL from environment variables or defaulting to localhost

const Login = () => { // Login component that handles user authentication

  const [formData, setFormData] = useState({ // State to manage form data for login
    username: '',
    password: ''
  });

  const persistLogin = (token, username) => { // Function to persist login information in localStorage
   if(token) localStorage.setItem('token', token); // Store token in localStorage
   if(username !== undefined && username !== null) localStorage.setItem('username', username); // Store username in localStorage
  };

  let handleInput = (e) => { // Function to handle input changes in the form
    const { name, value } = e.target; // Destructure name and value from the input event
    setFormData({ ...formData, [name]: value }); // Update formData state with the new value for the input field
  };

  const login = async (formData) => { // Function to handle user login
    const response = await fetch(`${API_URL}/api/v1/auth/login`, { // API endpoint for user login
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convert form data to JSON string
    });



    if (response.ok) { // Check if the response is successful
      const result = await response.json(); // Parse the JSON response from the server
      console.log('Login successful:', result); // Log the successful login result

      localStorage.removeItem('cartItems'); // Clear cart items from localStorage on successful login

      persistLogin(result.token, result.username); // Persist login information in localStorage
      setTimeout(() => { // Navigate to the home page after a short delay
      navigate('/');
      }, 100);
    } else {
      console.error('Login failed:', response.statusText);
    }
  };

  const navigate = useNavigate(); // useNavigate hook from react-router-dom to navigate to different routes
  return (
    <Box display="flex" justifyContent="space-between" flexDirection="column" minHeight="100vh">
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Box className="form">
          <Typography variant="h4" className="title">Login</Typography>
          <Stack spacing={2}>
            <TextField value={formData.username} label="Username" variant="outlined" fullWidth name="username" onChange={handleInput} />
            <TextField value={formData.password} label="Password" variant="outlined" type="password" fullWidth name="password" onChange={handleInput} />
            <Button onClick={async () => await login(formData)} variant="contained" color="primary" className="button">Login</Button>
            <Typography variant="body2" className="secondary-action">
              Don't have an account? <Link to="/register" className="link">Register</Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login; // Exporting the Login component as the default export of this module
