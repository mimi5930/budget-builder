import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
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

export default function GraphButtons(params) {
  const [month, setMonth] = useState('');

  return (
    <Box>
      <Button variant="contained">Press me!</Button>
      <FormControl>
        <InputLabel id="month">Month</InputLabel>
        <Select
          labelId="month"
          id="monthSelect"
          label="Month"
          value={month}
          MenuProps={MenuProps}
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
    </Box>
  );
}
