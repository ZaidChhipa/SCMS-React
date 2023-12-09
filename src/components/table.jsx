import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
  table: {
    // minWidth: 650,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    borderBottom: '1px solid #ccc',
  },
  tableBodyCell: {
    borderBottom: '1px solid #eee',
  },
});

const MuiTable = ({ data, columns }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} className={`${classes.tableHeaderCell} border`}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key} className={`${classes.tableBodyCell} border`}>
                  {item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MuiTable;
