import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import {host} from '../Variable';
import AuthBackground from '../assets/images/auth/AuthBackground';

const theme = createTheme();

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    userId: '',
    password: '',
    accountType: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    userId: '',
    password: '',
    accountType: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {
      fullName: formData.fullName.trim() === '' ? 'Full Name is required' : '',
      email: formData.email.trim() === '' ? 'Email Address is required' : '',
      userId: formData.userId.trim() === '' ? 'User ID is required' : '',
      password: formData.password.trim() === '' ? 'Password is required' : '',
      accountType: formData.accountType.trim() === '' ? 'Account Type is required' : '',
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error !== '')) {
        const accounts = {
            id: 0,
            userId: formData.userId,
            username: formData.fullName,
            accountType: formData.accountType,
            createdOn: "2023-12-26T18:45:16.572Z"
          };
          
      const accountsusers = {
            id: 0,
            userId: formData.userId,
            userName: formData.fullName,
            userPassword: formData.password,
            userAccountType: formData.accountType,
            userAddress: "",
            userEmail: formData.email,
            userPhone1: null,
            userPhone2: null,
            userCnic: null,
            userArea: "",
            userCity: "",
            userRating: null,
            userReturnRate: null,
            createdBy: 0,
            createdOn: "2023-12-26T18:41:53.818Z"
      };
      
      var resaccountusers="";
      var responseaccount="";

      try{
        resaccountusers = await axios.post(`${host}/Setup/saveaccountusers`, accountsusers);
        responseaccount = await axios.post(`${host}/Setup/saveaccount`, accounts);

        console.log("accountusers : ",resaccountusers);
        console.log("accounts : ",responseaccount);

        if(responseaccount.data.statusCode == '000' && resaccountusers.data.statusCode == '000'){
            navigate('/logintest');
          }
          else{
            alert(resaccountusers.data.message);
          }
      }
      catch(e){
        alert(e.message);
      }      
        
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthBackground/>
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
          {/* <Avatar
            sx={{
              margin: theme.spacing(1),
              backgroundColor: theme.palette.secondary.main,
            }}
          >
             <LockOutlinedIcon /> 
          </Avatar> */}
          <Typography component="h1" variant="h4" sx={{ color: '#1890ff',  fontWeight : 'bold', marginBottom: theme.spacing(2) }}>
            Sign Up
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
              id="fullName"
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              autoFocus
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userId"
              label="User ID"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              error={!!errors.userId}
              helperText={errors.userId}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
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
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px' }}
            />
            <InputLabel htmlFor="accountType">Account Type</InputLabel>
            <Select
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              error={!!errors.accountType}
              helperText={errors.accountType}
              sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            >
              <MenuItem value="" disabled>Select Account Type</MenuItem>
              <MenuItem value="1">Whole Saler</MenuItem>
              <MenuItem value="2">Retailer</MenuItem>
              
            </Select>
            <Button
             fullWidth size="small" type='submit' variant="contained" color="primary"
              style={{
                marginTop: theme.spacing(3),
                borderRadius: '5px',
              }}
            >
              Sign Up
            </Button>
          </form>
          <p>Already Have Account ?  <a href="/logintest"><b>Login</b></a>   </p>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
