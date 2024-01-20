import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import {
    Button,
    TextField,
    Typography,
    Container,
    CssBaseline,
    Avatar,
    createTheme,
    ThemeProvider,
    Box,
  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme(); 

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
      const [errors, setErrors] = useState({
        username: '',
        password: '',
      });
    
      const [userCredentials] = useState([
        { username: 'admin', password: 'admin' },
        { username: 'user2', password: 'password2' },
        // Add more user credentials as needed
      ]);

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Basic validation
        const newErrors = {
          username: formData.username.trim() === '' ? 'Username is required' : '',
          password: formData.password.trim() === '' ? 'Password is required' : '',
        };
    
        setErrors(newErrors);
    
        if (!newErrors.username && !newErrors.password) {
            // Check if user credentials match
            const matchingUser = userCredentials.find(
                (user) => user.username === formData.username && user.password === formData.password
            );

            if (matchingUser) {
                navigate('/dashboard');
            } else {
                setErrors({
                ...newErrors,
                username: 'Invalid credentials',
                password: 'Invalid credentials',
                });
            }
        }
    }


  return (
    <ThemeProvider theme={theme}>
    <Container
   component="main"
   maxWidth="xs"
   style={{
     height: '100vh',
     display: 'flex',
     alignItems: 'center',
   }}
     >
      <CssBaseline />
      <Box
        sx={{
          border: '1px solid #000',
          borderRadius: '10px',
          padding: theme.spacing(4),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: '#000', marginBottom: theme.spacing(2) }}>
          Sign in
        </Typography>
        <form
          style={{
            width: '100%',
            marginTop: theme.spacing(2),
          }}
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            // autoComplete="username"
            autoFocus
            InputLabelProps={{ shrink: true }} // Ensure the label doesn't overlap with the input
            sx={{ backgroundColor: 'white', borderRadius: '5px'}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            // autoComplete="current-password"
            InputLabelProps={{ shrink: true }}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              marginTop: theme.spacing(3),
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '5px',
            }}
          >
            Sign In
          </Button>
        </form>
        <p>Don't Have Account ?  <a href="/signup"><b>SignUp</b></a>   </p>
      </Box>
    </Container>
  </ThemeProvider>
  );
}

export default Login;
