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
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

export default function DateSelect(params) {
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());

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
      <Button variant="contained" sx={{ padding: 1.9, marginRight: 3 }}>
        Search
      </Button>
    </Box>
  );
}
