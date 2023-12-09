import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
  button: {
    margin: '0 8px',
  },
});

const MyButtonComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Button variant="contained" color="primary" className={`${classes.button} custom-btn`}>
        Add
      </Button>
      <Button variant="contained" color="secondary" className={`${classes.button} custom-btn`}>
        Edit
      </Button>
      <Button variant="contained" color="error" className={`${classes.button} custom-btn`}>
        Delete
      </Button>
    </div>
  );
};

export default MyButtonComponent;
