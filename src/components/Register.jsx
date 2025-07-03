import { Box, Button, Stack, TextField } from '@mui/material';
import '../components/Register.css';
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    let balance = localStorage.getItem('balance');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const Register = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();

                if(result.token) localStorage.setItem('token', result.token);
                if(result.username) localStorage.setItem('username', result.username);
                if(result.balance) localStorage.setItem('balance', result.balance);
                  setFormData({
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        Register({
            username: formData.username,
            password: formData.password,
        });
    };

    let handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Box  display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh">
        <Header hasHiddenAuthButtons={true} />
        <Box className="content">
            <Stack spacing={2} className='form'>
                <h1 className="text-3xl font-bold mb-6">Register</h1>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
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
export default Register;