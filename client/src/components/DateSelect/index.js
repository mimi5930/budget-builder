import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';

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

  const submitHandler = async event => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/transactions/month/?month=${month}&year=${year}`
      );
      const data = await response.json();
      console.log(data);
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
          sx={{ width: 100 }}
        />
      </FormControl>
      <Button
        variant="contained"
        sx={{ padding: 1.9, marginRight: 3 }}
        onClick={submitHandler}
      >
        Search
      </Button>
    </Box>
  );
}
