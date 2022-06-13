import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';

export default function TypeSelect({ setTransactionData }) {
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!type) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/transactions/?type=${type}`
      );
      const data = await response.json();
      setTransactionData(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <Box>
      <FormControl>
        <InputLabel id="type">Type</InputLabel>
        <Select labelId="type" label="Type" value={type}>
          <MenuItem
            value="deposit"
            onClick={event => setType(event.target.getAttribute('data-value'))}
          >
            Deposit
          </MenuItem>
          <MenuItem
            value="external withdrawal"
            onClick={event => setType(event.target.getAttribute('data-value'))}
          >
            External Withdrawal
          </MenuItem>
          <MenuItem
            value="point of sale"
            onClick={event => setType(event.target.getAttribute('data-value'))}
          >
            Point of Sale
          </MenuItem>
        </Select>
      </FormControl>
      <LoadingButton
        loading={loading}
        variant="contained"
        onClick={handleSubmit}
      >
        Submit
      </LoadingButton>
    </Box>
  );
}
