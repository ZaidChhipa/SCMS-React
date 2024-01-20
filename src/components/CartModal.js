import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CartModal = ({ isOpen, handleClose, addedProduct }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          sx={{ position: 'absolute', top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="div" gutterBottom>
          Product Added to Cart
        </Typography>
        <Divider />

        {/* Display added product details */}
        <List>
          <ListItem>
            {/* <ListItemText primary={addedProduct.title} secondary={addedProduct.description} /> */}
          </ListItem>
          {/* Add more details as needed */}
        </List>

        {/* Close button */}
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CartModal;
