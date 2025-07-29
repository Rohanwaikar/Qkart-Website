import { Box, Button, Stack, TextField } from '@mui/material';
import '../components/Register.css';
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Getting the API URL from environment variables or defaulting to localhost

const Register = () => { // Register component for user registration
    let token = localStorage.getItem('token'); // Fetch token from localStorage
    let username = localStorage.getItem('username'); // Fetch username from localStorage
    
    const navigate = useNavigate(); // useNavigate hook from react-router-dom to navigate to different routes

    const [formData, setFormData] = useState({ // State to manage form data for registration
        username: "",
        password: "",
        confirmPassword: "",
    });

    const Register = async (data) => { // Function to handle user registration
        try {
            const response = await fetch(`${API_URL}/api/v1/auth/register`, // API endpoint for user registration
                {
                    method: 'POST', // HTTP method for registration
                    headers: { // Headers for the request
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // Convert form data to JSON string
                });
                const result = await response.json(); // Parse the JSON response from the server

                if(result.token) localStorage.setItem('token', result.token); // If registration is successful, store the token in localStorage
                if(result.username) localStorage.setItem('username', result.username); // Store the username in localStorage
                
                  setFormData({   // Reset form data after successful registration
                    username: "",
                    password: "",
                    confirmPassword: "",
                });
                navigate('/login');

            

            if (response.ok) {
                console.log('Registration successful');
            } else {
                console.error('Registration failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
        }
    };

    const handleSubmit = (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent default form submission behavior
        if (formData.password !== formData.confirmPassword) { // Check if password and confirm password match
            alert("Passwords do not match"); // Alert user if passwords do not match
            return; // Exit the function if passwords do not match
        }
        Register({ // Call the Register function with form data
            username: formData.username, // Send username
            password: formData.password, // Send password
        });
    };

    let handleInput = (e) => { // Function to handle input changes in the form
        const { name, value } = e.target; // Destructure name and value from the input event
        setFormData({ ...formData, [name]: value }); // Update formData state with the new value for the input field
    };

    return (
        <Box display="flex" // Main container for the Register component
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh">
        <Header hasHiddenAuthButtons={true} /> {/* Header component with hidden authentication buttons */}
        <Box className="content"> {/* Content area for the registration form */}
            <Stack spacing={2} className='form'>
                <h1 className="text-3xl font-bold mb-6">Register</h1>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm"> {/* Form for user registration */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">Username</label>
                        <TextField name='username' value={formData.username} onChange={handleInput} type="text" id="username" fullWidth variant="outlined" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                        <TextField name='password' value={formData.password} onChange={handleInput} type="password" id="password" fullWidth variant="outlined" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <TextField name='confirmPassword' value={formData.confirmPassword} onChange={handleInput} type="password" id="confirmPassword" fullWidth variant="outlined" />
                    </div>
                    <Button type='submit' className='button' variant='contained'>Register</Button>
                    Already have an account? <Link to="/login" className='link'>Login</Link>
                </form>
            </Stack>
            </Box>
        <Footer />

</Box>
);
};
export default Register; // Exporting the Register component as the default export of this module