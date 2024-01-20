import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Sidenav from '../Sidenav';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import Successalert from '../components/Successalert';
import {host} from '../Variable';
import Grid from '@mui/material/Grid';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const inputContainerStyle = {
    border: '1px solid #ccc', // Set your desired border style
    borderRadius: '8px', // Set your desired border radius
    backgroundColor: '#fff', // Set your desired background color
    padding: '16px', // Set your desired padding
    width: '90%', // Set your desired width as a percentage // Center the container
    margin: 'auto' // Set your desired margin bottom
  };
  
  const LeftAlignedBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '20px',
  });

const AccountUserSetup = () => {
  const [formData, setFormData] = useState({
    Id: '',
    UserId: '',
    UserName: '',
    UserPassword: '',
    UserAccountType: '',
    UserAddress: '',
    UserEmail: '',
    UserPhone1: '',
    UserPhone2: '',
    UserCNIC: '',
    UserArea: '',
    UserCity: '',
    UserRating: '',
    UserReturnRate: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
    // Make API call or perform other actions
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <LeftAlignedBox sx={{ flexGrow: 1, paddingLeft: 3 }}>
        <DrawerHeader />
        <h2>Account User Setup</h2>
        <Box sx={inputContainerStyle}>
          <form onSubmit={handleSubmit}>
            {/* Use Grid to create a two-column layout */}
            <Grid container spacing={2}>
              {/* First Column */}
              <Grid item xs={6}>
                <TextField
                  label="User ID"
                  name="UserId"
                  value={formData.UserId}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="User Name"
                  name="UserName"
                  value={formData.UserName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  size="small"
                  required
                />
              </Grid>

              {/* Second Column */}
              <Grid item xs={6}>
                <TextField
                  label="User Password"
                  name="UserPassword"
                  type="password"
                  value={formData.UserPassword}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="User Account Type"
                  name="UserAccountType"
                  value={formData.UserAccountType}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="normal"
                  required
                />
              </Grid>

              {/* Continue with the other fields... */}
              
              <Grid item xs={6}>
                <TextField
                  label="User City"
                  name="UserCity"
                  value={formData.UserCity}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="User Rating"
                  name="UserRating"
                  value={formData.UserRating}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="User Return Rate"
                  name="UserReturnRate"
                  value={formData.UserReturnRate}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  margin="normal"
                />
              </Grid>
            </Grid>

            {/* Submit button */}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </LeftAlignedBox>
    </Box>
  );
};


export default AccountUserSetup;
