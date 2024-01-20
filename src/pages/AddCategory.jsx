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

const AddCategory = () => {
  const [formData, setFormData] = useState({
    id : 0,
    categoryName: '',
    categoryMargin: '',
    categoryHeaderId: 0,
    categoryTypeId: 0,
    status: false, 
  });
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleOpenSnackbar = () => {
    setOpen(true);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };


  const handleSubmit = async (event) => {
    formData.createdBy = 0;
    formData.createdOn = '2023-12-23T20:12:00.661Z';
    formData.modifiedBy = 0;
    formData.modifiedOn = '2023-12-23T20:12:00.661Z';
    event.preventDefault();
    try {
      const submitData = {
        Id: formData.id,
        categoryName: formData.categoryName,
        categoryMargin: formData.categoryMargin,
        categoryHeaderId: formData.categoryHeaderId,
        categoryTypeId: formData.categoryTypeId,
        status: formData.status,
        createdBy: formData.createdBy,
        createdOn: formData.createdOn,
        modifiedBy: formData.modifiedBy,
        modifiedOn: formData.modifiedOn,
      };
      console.log('Submitted data:', submitData);
      const response = await axios.post(`${host}/Setup/savecategory`, submitData);
      console.log('Response:', response.data);
      handleOpenSnackbar();
      setTimeout(() => {
        window.location.href = '/category';
      }, 2000);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const categoryId = queryParams.get('id');
  
    if (categoryId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${host}/Setup/getcategorybyid?id=${categoryId}`);
          const categoryData = response.data[0];
  
          console.log("response  :", categoryData);
          // Fill the form data with the received data
          setFormData({
            id: categoryId,
            categoryName: categoryData.categoryName || '',
            categoryMargin: categoryData.categoryMargin || '',
            categoryHeaderId: categoryData.categoryHeaderId || '',
            categoryTypeId: categoryData.categoryTypeId,
            status: categoryData.status,
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Call the fetchData function
    }
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts
  
  useEffect(() => {
    const fetchCategoryTypes = async () => {
      try {
        // Fetch category types from the API
        const response = await axios.get(`${host}/setup/getallcategorytype`);
        const categoryTypeList = response.data;
        console.log("list : ",categoryTypeList);
        // Update state with the fetched category types
        setFormData((prevData) => ({
          ...prevData,
          categoryTypeList,
        }));
      } catch (error) {
        console.error('Error fetching category types:', error);
      }
    };
  
    fetchCategoryTypes();
  }, []); 

  useEffect(()=>{

    const fetchCategoryall = async () => {
      try {
        // Fetch category types from the API
        const response = await axios.get(`${host}/setup/getallcategory`);
        const categoryList = response.data;
        console.log("categorylist : ",categoryList);
        // Update state with the fetched category types
        setFormData((prevData) => ({
          ...prevData,
          categoryList,
        }));
      } catch (error) {
        console.error('Error fetching category types:', error);
      }
    };
  
    fetchCategoryall();
  }, []);


  console.log("formdata set : ",formData);
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Successalert
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        severity="success"
        message="Record saved successfully!"
      />
      <LeftAlignedBox sx={{ flexGrow: 1, paddingLeft: 3 }}>
        <DrawerHeader />
        <h1>Add Category</h1>
        <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
          <TextField
            label="Name"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            label="Category Margin"
            name="categoryMargin"
            value={formData.categoryMargin}
            onChange={handleChange}
            fullWidth
            margin="normal"
            size="small"
          />
          <FormControl fullWidth margin="normal">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Select
                label="Category HeaderId"
                name="categoryHeaderId"
                value={formData.categoryHeaderId}
                onChange={handleChange}
                size="small"
                sx={{ flex: 1 }}
              >
               <MenuItem value="" disabled>
                Select Category Type
              </MenuItem>
              <MenuItem value="0"> None </MenuItem>
              {formData.categoryList && formData.categoryList.map((categoryType) => (
                <MenuItem key={categoryType.id} value={categoryType.id}>
                  {categoryType.categoryName}
                </MenuItem>
              ))}
              </Select>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleOpenModal}
                sx={{ ml: 1 }}
              >
                +
              </Button>
            </Box>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Select
              label="Category TypeId"
              name="categoryTypeId"
              value={formData.categoryTypeId}
              onChange={handleChange}
              size="small"
              sx={{ flex: 1 }}
            >
              <MenuItem value="" disabled>
                Select Category Type
              </MenuItem>
              <MenuItem value="0"> None </MenuItem>
              {formData.categoryTypeList && formData.categoryTypeList.map((categoryType) => (
                <MenuItem key={categoryType.id} value={categoryType.id}>
                  {categoryType.categoryTypeName}
                </MenuItem>
              ))}
            </Select>
            </Box>
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

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Add Category Type</DialogTitle>
          <DialogContent>
            <TextField
              label="Category Name"
              name="modalField1"
              value={formData.modalField1}
              onChange={handleChange}
              fullWidth
              margin="normal"
              size="small"
            />
            <FormControl fullWidth margin="normal">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Select
                  label="Category Type"
                  name="categorytype"
                  value={formData.categorytype}
                  onChange={handleChange}
                  size="small"
                  sx={{ flex: 1 }}
                >
                  <MenuItem value="category1">CategoryType 1</MenuItem>
                  <MenuItem value="category2">CategoryType 2</MenuItem>
                  {/* Add more categories as needed */}
                </Select>
              </Box>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCloseModal} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </LeftAlignedBox>
    </Box>
  );
};

export default AddCategory;
