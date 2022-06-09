import './App.css';
import Graph from './components/Graph';
import Header from './components/Header';
import DateSelect from './components/DateSelect';
import { useEffect, useRef, useState } from 'react';

import monthData from './utils/initialFetch';

function App() {
  const transactionData = useRef('loading');

  // get current month's transactions
  useEffect(() => {
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    async function firstFetch() {
      const data = await monthData(month, year);
      if (data.length) transactionData.current = data;
      else {
        const prevMonthData = await monthData(month - 1, year);
        transactionData.current = prevMonthData;
      }
    }

    firstFetch();
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Graph transactionData={transactionData}></Graph>
      <DateSelect></DateSelect>
    </div>
  );
}

export default App;
