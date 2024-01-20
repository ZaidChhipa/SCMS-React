import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
    marginLeft : '-10px'
  },
  table: {
    
    // minWidth: 650,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    borderBottom: '1px solid #ccc',
    padding: '8px', // Adjust padding
  },
  tableBodyCell: {
    borderBottom: '1px solid #eee',
    padding: '8px', // Adjust padding
  },
  compactRow: {
    height: '36px', // Adjust row height
  },
  compactCheckbox: {
    padding: '6px', // Adjust checkbox padding
  },
});

const MuiTable = ({ data, columns, onRowClick, selectedRows }) => {
  const classes = useStyles();

  const handleCheckboxClick = (event, row) => {
    onRowClick(row);
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={`${classes.tableHeaderCell} ${classes.compactCheckbox}`}></TableCell>
            {columns.map((column) => (
              <TableCell key={column.key} className={`${classes.tableHeaderCell}`}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} hover className={classes.compactRow}>
              <TableCell className={classes.compactCheckbox}>
                <Checkbox
                  checked={selectedRows.includes(item.id)}
                  onChange={(event) => handleCheckboxClick(event, item)}
                  size="small" // Adjust checkbox size
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.key} className={classes.tableBodyCell}>
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
