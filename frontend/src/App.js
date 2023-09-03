import './App.css';
import { useEffect, useState } from 'react'
import { connect } from './api/connect';
import History from './components/history';
import Box from './components/box';

function App() {

  const [history, setHistory] = useState([])

  const handleHistory = (msg) => {
    setHistory((prev) => [...prev, msg]);
  }
  useEffect(() => {
    const socket = connect((msg) => {
      console.log("new msg: ", msg);
    }, handleHistory);
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  console.log("his:", history)

  return (
    <div className="App">
      <h1>Hello world!.</h1>
      <History history={history} />
      <Box />
    </div>
  );
}

export default App;
