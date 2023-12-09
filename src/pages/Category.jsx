import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Sidenav from '../Sidenav';
import Box from '@mui/material/Box';
import Table from '../components/table'; 
import Button from '../components/buttons';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Category = () => {
  const tableData = [
    { column1: 'Data 1', column2: 'Data A' },
    { column1: 'Data 2', column2: 'Data B' },
  ];

  const columns = [
    { key: 'column1', label: 'Column 1' },
    { key: 'column2', label: 'Column 2' },
  ];

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box sx={{ flexGrow: 1, paddingLeft: 3 }}>
          <DrawerHeader />
          {/* <Typography variant="h2" className={classes.heading}>
        Category
      </Typography> */}

            <h1>Category</h1>
          <Button></Button>
          <Table data={tableData} columns={columns} />
        </Box>
      </Box>
    </div>
  );
};

export default Category;
