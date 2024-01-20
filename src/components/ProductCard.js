import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', marginBottom: 2 }}>
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.brand}
        </Typography>
        <Typography variant="body1">${product.price.toFixed(2)}</Typography>
        <Typography variant="body2" color="textSecondary">
          In stock: {product.stock}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;