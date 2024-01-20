import React, { useState } from 'react';
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const LeftAlignedBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '20px',
});

const AddCategoryType = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    status: false,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Form data:', formData);
    // You can send the data to your backend or perform any other actions
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <LeftAlignedBox sx={{ flexGrow: 1, paddingLeft: 3 }}>
        <DrawerHeader />
        <h1>Add Category Type</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small" // Adjust the size as needed
          />
           
          <FormControl fullWidth margin="normal">
            <Select
              label="Category Type"
              name="categorytype"
              value={formData.category}
              onChange={handleChange}
              size="small" // Adjust the size as needed
            >
              <MenuItem value="category1">Category 1</MenuItem>
              <MenuItem value="category2">Category 2</MenuItem>
            </Select>
          </FormControl>
           
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.status}
                  onChange={handleChange}
                  name="status"
                />
              }
              label="Status"
            />
          </FormGroup>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </LeftAlignedBox>
    </Box>
  );
};

export default AddCategoryType;
