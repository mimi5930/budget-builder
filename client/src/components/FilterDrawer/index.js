import React from 'react';
import DateSelect from '../DateSelect';
import DescSelect from '../DescSelect';
import TypeSelect from '../TypeSelect';
import { Drawer, IconButton, Box, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function FilterDrawer({ setOpen, open, setTransactionData }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h2">
          Search Options
        </Typography>
        <IconButton size="large" onClick={handleClose} sx={{ margin: 1 }}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <DateSelect setTransactionData={setTransactionData}></DateSelect>
        <DescSelect setTransactionData={setTransactionData}></DescSelect>
        <TypeSelect setTransactionData={setTransactionData}></TypeSelect>
      </Box>
    </Drawer>
  );
}
