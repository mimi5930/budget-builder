import React, { useEffect, useRef, useState } from 'react';
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
import { Box } from '@mui/material';

import { format as dateFormat } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function Graph({ transactionData }) {
  const chartRef = useRef();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // organize data
    var labels = [];
    var totals = [];
    var descriptions = [];
    var amounts = [];
    if (typeof transactionData !== 'string') {
      transactionData.forEach(transaction => {
        labels.push(dateFormat(new Date(transaction.date), 'MMM do'));
        totals.push(transaction.balance);
        descriptions.push(
          transaction.description
            .replace('Point Of Sale Withdrawal ', '')
            .replace('External Withdrawal ', '')
        );
        amounts.push(transaction.amount.toFixed(2));
      });
    }

    setChartData({
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
    });

    setChartOptions({
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
              let label =
                descriptions[context.dataIndex] +
                ` (${amounts[context.dataIndex]})`;
              return label;
            },
            afterLabel: function (context) {
              let afterLabel = totals[context.dataIndex];
              return afterLabel;
            }
          }
        }
      }
    });
  }, [transactionData]);

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
          width: '75%'
        }}
      >
        {transactionData === 'loading' ? (
          <div>loading</div>
        ) : (
          <Line
            ref={chartRef}
            data={chartData}
            options={chartOptions}
            onClick={clickHandler}
          />
        )}
      </Box>
    </Box>
  );
}
