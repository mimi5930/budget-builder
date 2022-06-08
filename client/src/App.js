import './App.css';
import Graph from './components/Graph';
import Header from './components/Header';
import DateSelect from './components/DateSelect';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Graph></Graph>
      <DateSelect></DateSelect>
    </div>
  );
}

export default App;
