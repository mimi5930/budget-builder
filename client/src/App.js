import './App.css';
import Graph from './components/Graph';
import Header from './components/Header';
import FilterDrawer from './components/FilterDrawer';
import { useEffect, useState } from 'react';

import monthData from './utils/initialFetch';

function App() {
  // const transactionData = useRef('loading');
  const [transactionData, setTransactionData] = useState('loading');
  const [open, setOpen] = useState(false);

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
      <Header setOpen={setOpen}></Header>
      <FilterDrawer
        setOpen={setOpen}
        open={open}
        setTransactionData={setTransactionData}
      ></FilterDrawer>
      <Graph transactionData={transactionData} open={open}></Graph>
    </div>
  );
}

export default App;
