import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TransactionList from "./components/TransactionList";
import Transaction from "./components/Transaction";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Client from "./components/Client";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Financial House</h1>
        </header>
        <div className="ui raised very padded text container segment">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route
              exact
              path="/transactionList"
              element={<TransactionList />}
            />
            <Route exact path="/transaction" element={<Transaction />} />
            <Route exact path="/client" element={<Client />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
