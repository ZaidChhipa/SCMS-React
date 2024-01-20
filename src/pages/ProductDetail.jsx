import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Chip, Rating, Grid, Card, CardMedia, Button ,CardContent} from '@mui/material';
import Sidenav from '../Sidenav';
import Box from '@mui/material/Box';
import { Container} from '@mui/material';
import yourImage from '../assets/images/users/watch.jpg';
import yourImage2 from '../assets/images/users/watchback.jpg';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(yourImage);

  const imageArray = [
    yourImage2,
    yourImage,
    yourImage,
    yourImage,
    yourImage,
    yourImage,
    yourImage
  ];
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const quantities = [1, 2, 3, 4]; // Predefined quantities
  const prices = {
    1: 50, // Replace with the actual price for quantity 1
    2: 90, // Replace with the actual price for quantity 2
    3: 120, // Replace with the actual price for quantity 3
    4: 150, // Replace with the actual price for quantity 4
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to the cart.`);
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box sx={{ flexGrow: 1, paddingLeft: 3 }}>
          <DrawerHeader />
          <Typography
            variant="h5"
            sx={{
              padding: 2,
              marginLeft: 3,
              fontWeight: 'bold',
            }}
          >
            Product Detail
          </Typography>

          <Container
            sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
              <Card>
          <CardMedia
            component="img"
            height="450"
            image={selectedImage}
            alt="Product Image"
          />
        </Card>

                {/* Row of smaller images */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {imageArray.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '80px',
                height: '60px',
                cursor: 'pointer',
                border: `1px solid ${selectedImage === image ? '#000' : 'transparent'}`,
                borderRadius: '4px',
              }}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
              </Grid>

              <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ marginBottom: '8px', color: '#333' }}>
                Smart Watch
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '16px', color: '#555' }}>
                Product Description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            
            {/* Colors */}
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#777' }}>
                Colors:
            </Typography>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <Chip label="Red" style={{ backgroundColor: 'red', color: 'white' }} />
                <Chip label="Blue" style={{ backgroundColor: 'blue', color: 'white' }} />
                <Chip label="Green" style={{ backgroundColor: 'green', color: 'white' }} />
            </div>
            
            {/* Sizes */}
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#777' }}>
                Sizes:
            </Typography>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <Chip label="XS" color="primary" />
                <Chip label="SM" color="primary" />
                <Chip label="L" color="primary" />
            </div>

            {/* Minimum Order Value */}
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#777' }}>
                Minimum Order Value: 50
            </Typography>

            {/* Review Stars */}
            <Typography variant="body2" sx={{ marginBottom: '8px', color: '#777' }}>
                Customer Reviews:
            </Typography>
            <Rating
                name="product-rating"
                value={4.5}  // Set the average rating value
                precision={0.5}  // Set the precision for half-star ratings
                readOnly
                sx={{ marginBottom: '16px' }}
            />

      

                {/* Price Display */}
                <Typography variant="h5" sx={{ marginTop: '16px', color: '#777' }}>
                Total Price: ${prices[quantity]}
                </Typography>

                {/* Quantity Selection */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                  <Button
                    variant="outlined"
                    onClick={handleDecrement}
                  >
                    -
                  </Button>
                  <Typography variant="body1" sx={{ margin: '0 8px' }}>
                    {quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleIncrement}
                  >
                    +
                  </Button>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  sx={{ marginTop: '16px' }}
                >
                  Add to Cart
                </Button>
              </Grid>
            </Grid>
          </Container>

          <Typography
            variant="h5"
            sx={{
              padding: 2,
              marginLeft: 3,
              fontWeight: 'bold',
            }}
          >
            Related Products
          </Typography>

          <Container sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
        <Grid container spacing={3}>
          {[1, 2, 3].map((productNumber) => (
            <Grid item xs={12} md={4} key={productNumber}>
              <Card>
                <CardMedia component="img" height="260" image={yourImage} alt={`Product ${productNumber}`} />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ marginBottom: '8px', color: '#333' }}>
                    Product {productNumber} Name
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: '16px', color: '#555' }}>
                    Small description about Product {productNumber}.
                  </Typography>
                  <Button variant="contained" color="primary">
                    View Product
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
        </Box>
      </Box>
    </div>
  );
};

export default ProductDetail;
