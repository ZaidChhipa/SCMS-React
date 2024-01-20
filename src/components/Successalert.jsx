import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Successalert = ({ open,  onClose, anchorOrigin, severity, message }) => {
  return (
    <div>
       <Snackbar
        open={open}
        onClose={onClose}
        anchorOrigin={anchorOrigin || { vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert onClose={onClose} severity={severity || 'success'} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Successalert;
