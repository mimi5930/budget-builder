import './App.css';
import Graph from './components/Graph';
import Header from './components/Header';
import DateSelect from './components/DateSelect';
import { useEffect, useRef, useState } from 'react';

import monthData from './utils/initialFetch';

function App() {
  // const transactionData = useRef('loading');
  const [transactionData, setTransactionData] = useState('loading');

  // get current month's transactions
  useEffect(() => {
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    async function firstFetch() {
      const data = await monthData(month, year);
      if (data.length) setTransactionData(data);
      else {
        let prevMonth = month - 1;
        let newYear = year;
        if (prevMonth < 0) {
          prevMonth = 12;
          newYear = year - 1;
        }
        const prevMonthData = await monthData(prevMonth, newYear);
        setTransactionData(prevMonthData);
      }
    }

    firstFetch();
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Graph transactionData={transactionData}></Graph>
      <DateSelect setTransactionData={setTransactionData}></DateSelect>
    </div>
  );
}

export default App;
