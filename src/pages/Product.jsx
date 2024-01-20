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
import { host } from '../Variable';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Successalert from '../components/Successalert';
import { Card } from '@mui/material';
import {OutlinedInput } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));
  
  const inputContainerStyle = {
    border: '1px solid #ccc', 
    borderRadius: '8px', 
    backgroundColor: '#fff', 
    padding: '16px', 
    width: '80%', 
    marginBottom: '30px', 
    margin : 'auto'
  };

const Product = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode');
  const isViewMode = mode === 'view';
  var inputfield = false;
  if(isViewMode){ 
    inputfield = true;
  }
  const [formData, setFormData] = useState({
    id : 0,
    categoryName: '',
    categoryMargin: '',
    categoryHeaderId: 'null',
    categoryTypeId: 0,
    status: false ,
    productName : '',
    productDescription : '',
    warranty : '',
    Minordervalue : 0
  });

  const handleSubmit = async () => {
    const lineItemCounter = (index) => index + 1;
    // Constructing the formData object
    const formDataToSend = {
      "id": formData.id,
      "productName": formData.productName,
      "productDescription": formData.productDescription,
      "categoryId": formData.categoryHeaderId,
      "status": 1,
      "warranty": formData.warranty,
      "productAtributeId": 0,
      "productAttributes": sizes.map((size, index) => ({
        "id": 0,
        "productId": formData.id,
        "lineItemId": lineItemCounter(index), 
        "colorName": '',
        "sizeName": size.size,
        "sizeUnitId": 0,
        "weightName": weights[index] ? weights[index].weight : '',
        "weightUnitId": 0,
        "createdBy": 0,
        "createdOn": new Date().toISOString(),
        "modifiedBy": 0,
        "modifiedOn": new Date().toISOString(),
        "product":{
          "id": 0,
          "productName": "string",
          "productDescription": "string",
          "categoryId": 0,
          "status": true,
          "warranty": "string",
          "productAtributeId": 0,
          "accountId": 0,
          "createdBy": 0,
          "createdOn": "2024-01-17T17:28:01.023Z",
          "modifiedBy": 0,
          "modifiedOn": "2024-01-17T17:28:01.023Z"
        }
      })),
      "productBulks": inputs.map((input, index) => ({
        "id": 0,
        "productId": formData.id,
        "lineItemId": lineItemCounter(index),
        "quantity": input.quantity,
        "amount": input.price,
        "createdBy": 0,
        "createdOn": new Date().toISOString(),
        "modifiedBy": 0,
        "modifiedOn": new Date().toISOString(),
        "product":{
          "id": 0,
          "productName": "string",
          "productDescription": "string",
          "categoryId": 0,
          "status": true,
          "warranty": "string",
          "productAtributeId": 0,
          "accountId": 0,
          "createdBy": 0,
          "createdOn": "2024-01-17T17:28:01.023Z",
          "modifiedBy": 0,
          "modifiedOn": "2024-01-17T17:28:01.023Z"
        }
      })),
      "accountId": 0,
      "createdBy": 0,
      "createdOn": new Date().toISOString(),
      "modifiedBy": 0,
      "modifiedOn": new Date().toISOString(),
    };
    

    try {

      console.log(formDataToSend);
      // Send formDataToSend to the server using Axios or your preferred method
      const response = await axios.post(`${host}/setup/saveproduct`, formDataToSend);
      console.log('Response:', response.data.statusCode);
      if(response.data.statusCode == "000"){
        handleOpenSnackbar();
        setTimeout(() => {
          window.location.href = '/category';
        }, 2000);
      }
      else{
        alert("not saved! Error Occured ");
      }
      // Handle success or any other logic based on the response
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error
    }
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const [inputs, setInputs] = useState([{ quantity: '', price: '', showButton: true }]);
  const [colors, setColors] = useState([{ name: '', showButton: true }]);
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

  const [weights, setWeights] = useState([{ unit: '', weight: '', showButton: true }]);


  const [sizes, setSizes] = useState([{ size: '', showButton: true }]);

  const handleSizeChange = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index].size = value;
    setSizes(newSizes);
  };
const handleAddSize = (index) => {
    const newSizes = [...sizes];
    newSizes[index].showButton = false;
    newSizes.push({size: '', showButton: true });
    setSizes(newSizes);
  };
  const handleUnitChange = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index].unit = value;
    newSizes[index].showUnit = false; // Disable unit selection after it has been chosen
    setSizes(newSizes);
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index].weight = value;
    setWeights(newWeights);
  };

  const handleAddWeight = (index) => {
    const newWeights = [...weights];
    newWeights[index].showButton = false;
    newWeights.push({ unit: '', weight: '', showButton: true });
    setWeights(newWeights);
  };

  const handleWeightUnitChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index].unit = value;
    setWeights(newWeights);
  };

  

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  
  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index].name = value;
    setColors(newColors);
  };

  const handleAddColor = (index) => {
    const newColors = [...colors];
    newColors[index].showButton = false;
    newColors.push({ name: '', showButton: true });
    setColors(newColors);
  };
  const handleInputChange = (index, key, value) => {
    const newInputs = [...inputs];
    newInputs[index][key] = key === 'price' ? formatCurrency(value) : value;
    setInputs(newInputs);
  };

  const formatCurrency = (value) => {
    // Assuming 'value' is a number, if not, you may need to parse it to a number first
    return parseFloat(value.replace(/[^0-9.-]+/g, '')).toLocaleString('en-US', {
      maximumFractionDigits: 0 // Change the currency code accordingly
    });
  };

  const handleAddInput = (index) => {
    const newInputs = [...inputs];
    newInputs[index].showButton = false;
    setInputs([...newInputs, { quantity: '', price: '', showButton: true }]);
  };

   const handleFileChange = (event) => {
    const files = event.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      newImages.push({ file, imageUrl });
    }

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };


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
    <Box sx={{ flexGrow: 1, paddingLeft: 3, paddingRight: 2 }}>
    <DrawerHeader />
    <Grid container spacing={2}>
    
    <Grid item xs={12}>
    <Typography variant="h4"
    sx={{
      marginTop : 2,
      fontWeight : 'bold'
    }}
    >Add New Products</Typography>
    </Grid>

   
    {/* Basic Information */}
      <Grid item xs={6}>
      <Paper elevation={2} style={{ padding: '12px'}}>
      <Typography variant="h6"
      sx={{
        padding : 1,
        marginLeft : -1,
        fontWeight : 'bold'
      }}
      >Basic Information</Typography>
      <Card
        variant="outlined"
        sx={{
          p: 1,
          boxShadow: '0 1px 3px rgba(0, 127, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          padding : 1.5,
          gap: 0.5
        }}
      >
        <TextField
          label="Product Name"
          name="productName"
          type="text"
          onChange={handleChange}
          value={formData.productName}
          fullWidth
          size="small"
          margin="normal"
          required
          disabled = {inputfield}
          />
        <TextField
          id="firstname-login"
          multiline
          label = 'Product Description'
          name="productDescription"
          rows={3} // Set the number of rows
          value={formData.productDescription}
          onChange={handleChange}
         
          variant="outlined" // Add outlined style
          fullWidth // Take up the full width
          disabled = {inputfield}
          />
          <TextField
          label="Warranty"
          name="warranty"
          type="text"
          onChange={handleChange}
          value={formData.warranty}
          fullWidth
          size="small"
          margin="normal"
          required
          disabled = {inputfield}
          />

          <TextField
          label="Minimum Order Value"
          name="Minordervalue"
          type="number"
          onChange={handleChange}
          value={formData.Minordervalue}
          fullWidth
          size="small"
          margin="normal"
          disabled = {inputfield}
          required
          />

          <Select
            label="Category HeaderId"
            name="categoryHeaderId"
            value={formData.categoryHeaderId}
            onChange={handleChange}
            size="small"
            disabled = {inputfield}
            fullWidth
            sx={{ flex: 1 }}
          >
            <MenuItem value="null" >
            Select Category Type
          </MenuItem>
          <MenuItem value="0"> None </MenuItem>
          {formData.categoryList && formData.categoryList.map((categoryType) => (
            <MenuItem key={categoryType.id} value={categoryType.id}>
              {categoryType.categoryName}
            </MenuItem>
          ))}
          </Select> 
        </Card>
      </Paper>
    </Grid>

    {/* ProductImages  */}
   <Grid item xs={6}>
      <Paper elevation={3} style={{ padding: '10px', height :'402px' }}>
        
        <Typography
          variant="h6"
          sx={{
            padding: 1,
            marginLeft: -1,
            fontWeight: 'bold',
          }}
        >
          Product Image
        </Typography>
        <Card
          variant="outlined"
          sx={{
            p: 1,
            boxShadow: '0 1px 3px rgba(0, 127, 255, 0.1)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            flexWrap: 'wrap', 
            gap: 0.5,
            
          }}
        >
           {selectedImages.slice(0,8).map((image, index) => (
            <div key={index} style={{ marginRight: '14px', marginBottom: '10px' , width: '22%'}}>
              <img
                src={image.imageUrl}
                alt={`Product ${index + 1}`}
                style={{ width: '130px', height: '126px', objectFit: 'cover' }}
              />
            </div>
          ))}

          <label htmlFor="image-input">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            disabled = {inputfield}
          >
            Upload
          </Button>
          
        </label>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
          style={{ display: 'none' }}
        />
        </Card>
        
      </Paper>
    </Grid>

    {/* Price and Qunatity */}
      <Grid item xs={6}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography
          variant="h6"
          sx={{
            padding: 1,
            marginLeft: -1,
            fontWeight: 'bold',
          }}
        >
          Price And Quantity
        </Typography>

        <Card
          variant="outlined"
          sx={{
            p: 1,
            boxShadow: '0 1px 3px rgba(0, 127, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 1.5,
            gap: 0.5,
          }}
        >
          {inputs.map((input, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px' }}>
              <TextField
                label="Quantity"
                value={input.quantity}
                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                size="small"
                type="number"
                disabled = {inputfield}
              />
              <TextField
                label="Price"
                type="currency"
                value={input.price}
                onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                size="small"
                disabled = {inputfield}
              />
              {input.showButton && (
                <Button
                  variant="contained"
                  onClick={() => handleAddInput(index)}
                  style={{ marginLeft: '10px' }}
                  disabled = {inputfield}
                >
                  +
                </Button>
              )}
            </div>
          ))}
        </Card>
      </Paper>
    </Grid>


{/* Colors */}
    <Grid item xs={6}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography
          variant="h6"
          sx={{
            padding: 1,
            marginLeft: -1,
            fontWeight: 'bold',
          }}
        >
          Color
        </Typography>

        <Card
          variant="outlined"
          sx={{
            p: 1,
            boxShadow: '0 1px 3px rgba(0, 127, 255, 0.1)',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',  // Add flexWrap property
            alignItems: 'flex-start',
            padding: 1.5,
            gap: 0.5,
          }}
        >
          {colors.map((color, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', flexDirection: 'row' }}>
              <TextField
                label="Color Name"
                value={color.name}
                onChange={(e) => handleColorChange(index, e.target.value)}
                size="small"
                disabled = {inputfield}
              />
              {color.showButton && (
                <Button
                  variant="contained"
                  onClick={() => handleAddColor(index)}
                  style={{ marginLeft: '10px' }}
                  disabled={!color.name} // Disable button if no color name
                >
                  +
                </Button>
              )}
            </div>
          ))}
        </Card>
      </Paper>
    </Grid>

    {/* Size */}
    <Grid item xs={6}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography
          variant="h6"
          sx={{
            padding: 1,
            marginLeft: -1,
            fontWeight: 'bold',
          }}
        >
          Sizes
        </Typography>

        <Card
          variant="outlined"
          sx={{
            p: 1,
            boxShadow: '0 1px 3px rgba(0, 127, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 1.5,
            gap: 0.5,
          }}
        >
          {sizes.map((size, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', flexDirection: 'row' }}>
              <FormControl variant="outlined" size="small" style={{ minWidth: '200px' }}>
                <InputLabel id={`unit-label-${index}`}>Unit</InputLabel>
                <Select
                  labelId={`unit-label-${index}`}
                  label="Unit"
                  value={size.unit}
                  onChange={(e) => handleUnitChange(index, e.target.value)}
                  disabled = {inputfield}
                >
                  <MenuItem value="meter">Meter</MenuItem>
                  <MenuItem value="cm">Centimeter</MenuItem>
                  <MenuItem value="ft">Feet</MenuItem>
                  {/* Add more units as needed */}
                </Select>
              </FormControl>
              {size.unit && (
                <>
                  <TextField
                    label="Size"
                    value={size.size}
                    onChange={(e) => handleSizeChange(index, e.target.value)}
                    size="small"
                    disabled = {inputfield}
                  />
                  {size.showButton && (
                    <Button
                      variant="contained"
                      onClick={() => handleAddSize(index)}
                      style={{ marginLeft: '10px' }}
                      disabled={!size.size} // Enable button only when size is entered
                    >
                      +
                    </Button>
                  )}
                </>
              )}
            </div>
          ))}
        </Card>
      </Paper>
    </Grid>

    {/* Weights */}
    <Grid item xs={6}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography
          variant="h6"
          sx={{
            padding: 1,
            marginLeft: -1,
            fontWeight: 'bold',
          }}
        >
          Weights
        </Typography>

        <Card
          variant="outlined"
          sx={{
            p: 1,
            boxShadow: '0 1px 3px rgba(0, 127, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 1.5,
            gap: 0.5,
          }}
        >
          {weights.map((weight, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', flexDirection: 'row' }}>
              <FormControl variant="outlined" size="small" style={{ minWidth: '200px' }}>
                <InputLabel id={`unit-label-${index}`}>Unit</InputLabel>
                <Select
                  labelId={`unit-label-${index}`}
                  label="Unit"
                  value={weight.unit}
                  onChange={(e) => handleWeightUnitChange(index, e.target.value)}
                  disabled = {inputfield}
                >
                  <MenuItem value="kg">Kilogram</MenuItem>
                  <MenuItem value="g">Gram</MenuItem>
                  <MenuItem value="lb">Pound</MenuItem>
                  {/* Add more units as needed */}
                </Select>
              </FormControl>
              {weight.unit && (
                <>
                  <TextField
                    label="Weight"
                    value={weight.weight}
                    onChange={(e) => handleWeightChange(index, e.target.value)}
                    size="small"
                    disabled = {inputfield}
                  />
                  {weight.showButton && (
                    <Button
                      variant="contained"
                      onClick={() => handleAddWeight(index)}
                      style={{ marginLeft: '10px' }}
                      disabled={!weight.weight} // Enable button only when weight is entered
                    >
                      +
                    </Button>
                  )}
                </>
              )}
            </div>
          ))}
        </Card>
      </Paper>
    </Grid>
   

    </Grid>
    <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
    
    </Box>
  );
};

export default Product;
