import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Sidenav from '../Sidenav';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TabPanel from '../components/Tabpanel'; // You need to create a TabPanel component
import {host} from '../Variable';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Successalert from '../components/Successalert';

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
  width: '80%', // Set your desired width as a percentage // Center the container
  marginBottom: '30px', 
  margin : 'auto'// Set your desired margin bottom
};


const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);

    const accountsusers = {
      id: formData.Id,
      userId: formData.UserId,
      userName: formData.UserName,
      userPassword: formData.UserPassword,
      userAccountType: formData.UserAccountType,
      userAddress: formData.UserAddress,
      userEmail: formData.UserEmail,
      userPhone1: formData.UserPhone1,
      userPhone2: formData.UserPhone2,
      userCnic: formData.UserCNIC,
      userArea: formData.UserArea,
      userCity: formData.UserCity,
      userRating: formData.UserRating,
      userReturnRate: formData.UserReturnRate,
      createdBy: 0,
      createdOn: "2023-12-26T18:41:53.818Z"
};
  try{
    var resaccountusers = await axios.post(`${host}/Setup/saveaccountusers`, accountsusers);
    if(resaccountusers.data.statusCode == '000'){
      
    }
    else{
      alert(resaccountusers.data.message);
    }
  }
  catch(e){

  }




    // Make API call or perform other actions
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    // const categoryId = queryParams.get('id');
    var accountid = queryParams.get('id');
    if(accountid > 0){

    }
    else{
      accountid = 1;
    }
     
  
    if (accountid) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${host}/Setup/getaccountusersbyid?id=${accountid}`);
          const AccountUserdata = response.data[0];
  
          console.log("response  :", AccountUserdata);
          // Fill the form data with the received data
          setFormData({
            Id : AccountUserdata.Id,
            UserId : AccountUserdata.userId,
            UserName : AccountUserdata.userName,
            UserEmail : AccountUserdata.userEmail,
            UserAccountType : AccountUserdata.userAccountType,
            UserPassword : AccountUserdata.password
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Call the fetchData function
    }
  }, []);


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




  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box sx={{ flexGrow: 1, paddingLeft: 3, paddingRight: 2 }}>
        <DrawerHeader />
        <Successalert
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        severity="success"
        message="Record saved successfully!"
      />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar alt="User Avatar" src="/path/to/avatar.jpg" sx={{ width: 100, height: 100, mb: 2 }} />
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="subtitle1" color="textSecondary">Retailer</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h6">User Details </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: 3 }}>
              <Tabs value={selectedTab} onChange={handleTabChange} centered>
                <Tab label="User" />
                <Tab label="Products" />
                <Tab label="Rating" />
                <Tab label="Tab 1" />
                <Tab label="Tab 1" />
                
              </Tabs>
              <TabPanel value={selectedTab} index={0}>
               
              <Box sx={inputContainerStyle}>
              <h3 style={{ textAlign: 'center' }}>User Information</h3>
              <form onSubmit={handleSubmit}>
                    <input
                type="hidden"
                name="Id"
                value={formData.Id}
                onChange={handleChange}
              />
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
                   <InputLabel htmlFor="accountType">Account Type</InputLabel>
                      <Select
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="UserAccountType"
                        name="UserAccountType"
                        value={formData.UserAccountType}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                      >
                        <MenuItem value="" disabled>Select Account Type</MenuItem>
                        <MenuItem value="1">Whole Saler</MenuItem>
                        <MenuItem value="2">Retailer</MenuItem>
                        
                      </Select>
                  </Grid>

                  {/* Continue with the other fields... */}
                  <Grid item xs={6}>
                    <TextField
                      label="User Address"
                      name="UserAddress"
                      value={formData.UserAddress}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="User Email"
                      name="UserEmail"
                      type="email"
                      value={formData.UserEmail}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="User Phone 1"
                      name="UserPhone1"
                      value={formData.UserPhone1}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="User Phone 2"
                      name="UserPhone2"
                      value={formData.UserPhone2}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="User CNIC"
                      name="UserCNIC"
                      value={formData.UserCNIC}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      margin="normal"
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="User Area"
                      name="UserArea"
                      value={formData.UserArea}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      margin="normal"
                      required
                    />
                  </Grid>
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
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
              </Box>
              </TabPanel>

              <TabPanel value={selectedTab} index={1}>
                <Typography variant="h6">Content for Tab 2</Typography>
              </TabPanel>

              <TabPanel value={selectedTab} index={2}>
                <Typography variant="h6">Content for Tab 3</Typography>
              </TabPanel>

              <TabPanel value={selectedTab} index={3}>
                <Typography variant="h6">Content for Tab 4</Typography>
              </TabPanel>

              <TabPanel value={selectedTab} index={4}>
                <Typography variant="h6">Content for Tab 5</Typography>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
