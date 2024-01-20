import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// material-ui
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

import AuthBackground from '../assets/images/auth/AuthBackground';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

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
      { username: 'admin', password: 'admin', accountType: 0 },
      { username: 'zaid', password: 'zaid@123', accountType: 1 },
      { username: 'sherry', password: 'sherry@123', accountType: 2 }
      // Add more user credentials as needed
    ]);

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
          window.AccountType = matchingUser.accountType;

          
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (

    <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Adjust the height as needed
      
    }}
  >
    
    <AuthBackground/>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 3px rgba(0, 127, 255, 0.1)',
        height: '80vh', // Adjust the height as needed
        borderRadius: 2, // Set the desired corner radius
        boxShadow: 1, // Add shadow if needed
        bgcolor: 'background.paper',
        width : 490,
        p: 3, // Padding
      }}
    >
       
        
      <form onSubmit={handleSubmit}>
     
        <Grid container spacing={3}>
       
          <Grid item xs={12}>
          
          <Stack direction="column" justifyContent="center" alignItems="center"
          sx={{
            height : 90
          }}
          >
                <img src="/color-full-logo.png" alt="Your Alt Text" style={{ 
                    height: 320,
                    marginRight:30,
                    paddingBottom : 20

                }} />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login" sx={{ fontSize: 15 }}>Username</InputLabel>
              <OutlinedInput
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                id="username"
                label="Username"
                placeholder='Enter Username'
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
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login" sx={{ fontSize: 15 }}>Password</InputLabel>
              <OutlinedInput
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder='Enter Password'
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                size="small"
                helperText={errors.password}
                // autoComplete="current-password"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px' }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sx={{ mt: -1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="body2">Keep me signed in</Typography>}
              />
              <Link variant="subtitle2" component={RouterLink} to="" color="text.primary">
                Forgot Password?
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth size="small" type='submit' variant="contained" color="primary">
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider>
            <p>Don&apos;t have an account?<a href="/signup"><b> Sign Up</b></a></p>
            {/* <Typography component={Link} to="/signup" variant="body1" sx={{ textDecoration: 'none' }} >
                Don&apos;t have an account?
              </Typography> */}
            </Divider>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </form>
    </Box>
    </Box>
  );
};

export default AuthLogin;
