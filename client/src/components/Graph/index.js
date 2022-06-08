import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';
import { Line, getElementAtEvent } from 'react-chartjs-2';
import { Box, Button } from '@mui/material';
import sampleData from '../../sampledata.json';
import GraphButtons from '../GraphButtons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function Graph(props) {
  const chartRef = useRef();

  // organize data
  var labels = [];
  var totals = [];
  var descriptions = [];
  var amounts = [];
  sampleData.forEach(transaction => {
    labels.push(transaction.date);
    totals.push(transaction.balance);
    descriptions.push(
      transaction.description
        .replace('Point of Sale Withdrawal ', '')
        .replace('External Withdrawal ', '')
    );
    amounts.push(transaction.amount.toFixed(2));
  });

  const data = {
    labels: labels,
    datasets: [
      {
        data: totals,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.2
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      tooltip: {
        titleAlign: 'center',
        bodyAlign: 'center',
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = descriptions[context.dataIndex];
            return label;
          },
          afterLabel: function (context) {
            let afterLabel = amounts[context.dataIndex];
            return afterLabel;
          }
        }
      }
    }
  };

  function clickHandler(event) {
    const pointIndex = getElementAtEvent(chartRef.current, event)[0]?.index;
    if (pointIndex) {
      console.log(pointIndex);
    }
  }

  return (
    <Box>
      <Box
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 25,
          width: '50%'
        }}
      >
        <Line
          ref={chartRef}
          data={data}
          options={options}
          onClick={clickHandler}
        />
      </Box>
      <GraphButtons />
    </Box>
  );
}
