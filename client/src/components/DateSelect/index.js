import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

const ITEM_HEIGHT = 25;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100
    }
  }
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export default function DateSelect({ setTransactionData }) {
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/transactions/month/?month=${month}&year=${year}`
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
        <InputLabel id="month">Month</InputLabel>
        <Select
          labelId="month"
          id="monthSelect"
          label="Month"
          value={month}
          MenuProps={MenuProps}
          sx={{ width: 100 }}
        >
          {months.map(monthOption => {
            return (
              <MenuItem
                key={monthOption}
                value={monthOption}
                onClick={event => {
                  setMonth(event.target.getAttribute('data-value'));
                }}
              >
                {monthOption}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          id="yearSelect"
          label="Year"
          value={year}
          onChange={event => setYear(event.target.value)}
          onKeyPress={event => event.key === 'Enter' && submitHandler()}
          sx={{ width: 100 }}
        />
      </FormControl>
      <LoadingButton
        loading={loading}
        variant="contained"
        sx={{ padding: 1.9, marginRight: 3 }}
        onClick={submitHandler}
      >
        Search
      </LoadingButton>
    </Box>
  );
}
