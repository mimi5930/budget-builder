import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function DescSelect({ setTransactionData }) {
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/transactions/type/${textInput}`
      );
      const data = await response.json();
      setTransactionData(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        label="Search"
        value={textInput}
        onChange={event => setTextInput(event.target.value)}
        onKeyPress={event => event.key === 'Enter' && handleSubmit()}
      ></TextField>
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
