import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Sidenav from '../Sidenav';
import Box from '@mui/material/Box';
import CustomTable from '../components/table'; 
import axios from 'axios';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {host} from '../Variable';

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
  button: {
    margin: '10px',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const CategoryType = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/Setup/getallcategorytype`);
        console.log("grid of cetogory type:",response.data);
        setCategoryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleButtonClick = (action) => {
    if (selectedRows.length > 0) {
      if (action === 'edit') {
        window.location.href = `/addcategorytype?id=${selectedRows[0]}`;
      } 
      else if (action === 'delete') { 
      }
    }
    else {
      if(action  === 'add'){
        window.location.href = '/addcategorytype';
      }
    }
  };


  const handleRowClick = (row) => {
    const rowIndex = selectedRows.indexOf(row.id);
    if (rowIndex === -1) {
      // Row is not selected, add it to the selection
      setSelectedRows([...selectedRows, row.id]);
    } else {
      // Row is selected, remove it from the selection
      setSelectedRows(selectedRows.filter((id) => id !== row.id));
    }
  };

  const classes = useStyles();
  const columns = [
    { key: 'id', label: 'Id' },
    { key: 'categoryTypeName', label: 'Category Type Name' },
    { key: 'categoryTypeHeaderName', label: 'Category Type Header Name' },
  ];

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box sx={{ flexGrow: 1, paddingLeft: 3 }}>
          <DrawerHeader />
          <h1>Category Type</h1>
          <div className={classes.container}>
            <Button
              variant="contained"
              color="primary"
              className={`${classes.button} custom-btn`}
              onClick={() => handleButtonClick('add')}
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={`${classes.button} custom-btn`}
              onClick={() => handleButtonClick('edit')}
              disabled={selectedRows.length !== 1}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              className={`${classes.button} custom-btn`}
              onClick={() => handleButtonClick('delete')}
              disabled={selectedRows.length === 0}
            >
              Delete
            </Button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CustomTable
              data={categoryData}
              columns={columns}
              onRowClick={handleRowClick}
              selectedRows={selectedRows}
            />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default CategoryType;
