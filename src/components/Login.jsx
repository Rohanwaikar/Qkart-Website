import {Box, CircularProgress, Stack, Button, TextField, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import "./Login.css";
import { useState } from 'react';

const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const persistLogin = (token, username, balance) => {
   if(token) localStorage.setItem('token', token);
   if(username !== undefined && username !== null) localStorage.setItem('username', username);
   if(balance !== undefined && balance !== null) localStorage.setItem('balance', balance);
  };

  let handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (formData) => {
    const response = await fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });



    if (response.ok) {
      const result = await response.json();
      console.log('Login successful:', result);

      localStorage.removeItem('cartItems');

      persistLogin(result.token, result.username, result.balance);
      setTimeout(() => {
      navigate('/');
      }, 100);
    } else {
      console.error('Login failed:', response.statusText);
    }
  };

  const navigate = useNavigate();
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

export default Login;
