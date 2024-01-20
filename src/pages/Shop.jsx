import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Container, Typography, Grid, Paperm,Checkbox, FormControlLabel, Card,CardMedia,Paper, InputAdornment} from '@mui/material';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Sidenav from '../Sidenav';
import Box from '@mui/material/Box';
import CustomTable from '../components/table'; 
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import yourImage from '../assets/images/users/watch.jpg';
import yourImage2 from '../assets/images/users/watchback.jpg';
import SearchIcon from '@mui/icons-material/Search';
import { Padding } from '@mui/icons-material';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const subcategoriesOptions = ['subCategoryA', 'subCategoryB', 'subCategoryC'];

const Shop = () => {
  const [products, setProducts] = useState([]);
  // const [minPrice, setMinPrice] = useState('');
  const [userInputPrice, setUserInputPrice] = useState('');
  const[userinputMinordervalue, setUserInputMinordervalue] = useState('');
  // const [maxPrice, setMaxPrice] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    ratings: [],
    price:[],
    subcategories : [],
    minordervalue : []
  });
  const minPrice  = 10;
  const maxPrice = 1100


  const handleApplyFilters = () => {
    // Filtering logic

    const mockedProducts = [
      { id: 1, name: 'Product 1', category: 'Category A', subcategories : 'subCategoryA', price: 20, rating: 4, image: yourImage },
      { id: 2, name: 'Product 2', category: 'Category B', subcategories : 'subCategoryB', price: 30, rating: 3.5, image: yourImage },
      { id: 3, name: 'Product 3', category: 'Category C',subcategories : 'subCategoryC', price: 25, rating: 5, image: yourImage2 },
      { id: 4, name: 'Product 4', category: 'Category D',subcategories : 'subCategoryD', price: 20, rating: 4, image: yourImage2 },
      { id: 5, name: 'Product 5', category: 'Category E',subcategories : 'subCategoryE', price: 30, rating: 3.5, image: yourImage },
      { id: 6, name: 'Product 6', category: 'Category F', subcategories : 'subCategoryF',price: 25, rating: 5, image: yourImage },
      { id: 7, name: 'Product 7', category: 'Category G',subcategories : 'subCategoryG', price: 20, rating: 4, image: yourImage },
      { id: 8, name: 'Product 8', category: 'Category H',subcategories : 'subCategoryH', price: 30, rating: 3.5, image: yourImage2 },
      { id: 9, name: 'Product 9', category: 'Category I',subcategories : 'subCategoryI', price: 25, rating: 5, image: yourImage },
      { id: 10, name: 'Product 10', category: 'Category J',subcategories : 'subCategoryJ', price: 20, rating: 4, image: yourImage2 },
      { id: 11, name: 'Product 11', category: 'Category J',subcategories : 'subCategoryK', price: 30, rating: 3.5, image: yourImage},
      { id: 12, name: 'Product 12', category: 'Category K',subcategories : 'subCategoryL', price: 25, rating: 5, image: yourImage2 }
      
      // Add more products as needed
    ];
    const filteredProducts = mockedProducts.filter(product => {
      return (
        (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
        (filters.subcategories.length === 0 || filters.subcategories.includes(product.subcategories)) &&
        (filters.ratings.length === 0 || filters.ratings.includes(product.rating)) &&
        (filters.minordervalue.length === 0 || filters.minordervalue.includes(product.minordervalue)) &&
        ((minPrice === '' && maxPrice === '' && userInputPrice === '') || 
          (Number(minPrice) <= Number(product.price) && Number(maxPrice) >= Number(product.price)) || 
          (userInputPrice !== '' && Number(userInputPrice) === Number(product.price))) 
      );
    });

    // Set filtered products to state
    setProducts(filteredProducts);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  useEffect(() => {
    // Mocked product data for demonstration
    const mockedProducts = [
      { id: 1, name: 'Product 1', category: 'Category A', subcategories : 'subCategoryA', price: 20, rating: 4, image: yourImage },
      { id: 2, name: 'Product 2', category: 'Category B', subcategories : 'subCategoryB', price: 30, rating: 3.5, image: yourImage },
      { id: 3, name: 'Product 3', category: 'Category C',subcategories : 'subCategoryC', price: 25, rating: 5, image: yourImage2 },
      { id: 4, name: 'Product 4', category: 'Category D',subcategories : 'subCategoryD', price: 20, rating: 4, image: yourImage2 },
      { id: 5, name: 'Product 5', category: 'Category E',subcategories : 'subCategoryE', price: 30, rating: 3.5, image: yourImage },
      { id: 6, name: 'Product 6', category: 'Category F', subcategories : 'subCategoryF',price: 25, rating: 5, image: yourImage },
      { id: 7, name: 'Product 7', category: 'Category G',subcategories : 'subCategoryG', price: 20, rating: 4, image: yourImage },
      { id: 8, name: 'Product 8', category: 'Category H',subcategories : 'subCategoryH', price: 30, rating: 3.5, image: yourImage2 },
      { id: 9, name: 'Product 9', category: 'Category I',subcategories : 'subCategoryI', price: 25, rating: 5, image: yourImage },
      { id: 10, name: 'Product 10', category: 'Category J',subcategories : 'subCategoryJ', price: 20, rating: 4, image: yourImage2 },
      { id: 11, name: 'Product 11', category: 'Category J',subcategories : 'subCategoryK', price: 30, rating: 3.5, image: yourImage},
      { id: 12, name: 'Product 12', category: 'Category K',subcategories : 'subCategoryL', price: 25, rating: 5, image: yourImage2 }
      
      // Add more products as needed
    ];



    // Apply filters to products
    const filteredProducts = mockedProducts.filter(product => {
      return (
        (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
        (filters.subcategories.length === 0 || filters.subcategories.includes(product.subcategories)) &&
        (filters.ratings.length === 0 || filters.ratings.includes(product.rating)) &&
        (filters.minordervalue.length === 0 || filters.minordervalue.includes(product.minordervalue)) &&
        ((minPrice === '' && maxPrice === '' && userInputPrice === '') || // If no price filters are set
          (Number(minPrice) <= Number(product.price) && Number(maxPrice) >= Number(product.price)) || // If min and max prices are set
          (userInputPrice !== '' && Number(userInputPrice) === Number(product.price))) // If user-inputted price is set
      );
    });
  
    setProducts(filteredProducts);
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      ratings: [],
      price: [],
      subcategories: [],
      minordervalue: [],
    });
    setUserInputPrice('');
  };
 

  const handleCheckboxChange = (field, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: prevFilters[field].includes(value)
        ? prevFilters[field].filter(item => item !== value)
        : [...prevFilters[field], value],
    }));
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box sx={{ flexGrow: 1 }}>
          <DrawerHeader />


      <div style={{ background: '#333', color: '#fff', padding: '2rem 0' }}>
        <Container>
          <Typography variant="h2" align="center" gutterBottom>
            Welcome to our Shop
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Discover amazing products and find great deals.
          </Typography>
          
        </Container>
      </div>
      <Grid container spacing={2}>
      {/* Filters Section */}
      <Grid item xs={12} sm={3}>
        <Paper elevation={4} style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Button variant="contained" color="primary" onClick={handleResetFilters}>Reset Filters</Button>
        </div>
          <hr />

          {/* Categories */}

          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>

          <FormControlLabel
            control={<Checkbox checked={filters.categories.includes('Category A')} onChange={() => handleCheckboxChange('categories', 'Category A')} />}
            label="Category A"
          />
          <FormControlLabel
            control={<Checkbox checked={filters.categories.includes('Category B')} onChange={() => handleCheckboxChange('categories', 'Category B')} />}
            label="Category B"
          />
           <FormControlLabel
            control={<Checkbox checked={filters.categories.includes('Category C')} onChange={() => handleCheckboxChange('categories', 'Category C')} />}
            label="Category C"
          />

          <hr/>

              {/* Sub Categories */}
      <Typography variant="h6" gutterBottom>
        Sub Categories
      </Typography>
      {subcategoriesOptions.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={filters.subcategories.includes(option)}
              onChange={() => handleCheckboxChange('subcategories', option)}
            />
          }
          label={option}
        />
      ))}

      <hr />

      <Typography variant="h6" gutterBottom>
        Price 
      </Typography>
      <br/>
      <Typography variant="Label" gutterBottom sx={{marginTop : 20}}>
      Min Price: {minPrice}              
      </Typography>
      <br/>
      <br/>
      <Typography variant="Label" gutterBottom sx={{marginTop : 20}}>
      Max Price: {maxPrice}              
      </Typography>
      <br/>
      <br/>

      <TextField
        label="Enter Price"
        variant="outlined"
        fullWidth
        size='small'
        value={userInputPrice}
        onChange={(e) => setUserInputPrice(e.target.value)}
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
      />


    <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleApplyFilters}>
      Apply 
    </Button>


        <hr/>

        <Typography variant="h6" gutterBottom>
        Min Order Value 
      </Typography>
      <br/>
      <Typography variant="Label" gutterBottom sx={{marginTop : 20}}>
      Min: {minPrice}              
      </Typography>
      <br/>
      <br/>
      <Typography variant="Label" gutterBottom sx={{marginTop : 20}}>
      Max : {maxPrice}              
      </Typography>
      <br/>
      <br/>

      <TextField
        label="Enter MinOrderValue"
        variant="outlined"
        fullWidth
        size='small'
        value={userInputPrice}
        onChange={(e) => setUserInputPrice(e.target.value)}
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
      />


    <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleApplyFilters}>
      Apply 
    </Button>

          <hr />

          <Typography variant="h6" gutterBottom>
            Rating
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={filters.ratings.includes(4)} onChange={() => handleCheckboxChange('ratings', 4)} />}
            label="Rating 4+"
          />
          <FormControlLabel
            control={<Checkbox checked={filters.ratings.includes(3.5)} onChange={() => handleCheckboxChange('ratings', 3.5)} />}
            label="Rating 3.5+"
          />
          {/* Add more rating filters as needed */}
        </Paper>
      </Grid>

      {/* Products Section */}
      <Grid item xs={12} sm={9}>

      {/* Search Bar */}
      

        <Paper elevation={3} style={{ padding: '2rem' }}>
          
            <Grid item xs={12}  style={{ padding: '16px' }}>
        
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
        </Grid>

        <Typography variant="h6" gutterBottom>
            Products Section
          </Typography>
          {/* Product Cards */}
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="240"
                    image={product.image}
                  />
                  <div style={{ padding: '1rem', textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Category: {product.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Rating: {product.rating}
                    </Typography>
                    <Button href='/productdetail' variant="contained" color="primary">View Detail</Button>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>

    </Box>
    </Box>
    </div>
  );
};

export default Shop;
