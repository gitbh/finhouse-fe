import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to="/transactionList">Transaction List</Link>
      <br />
      <Link to="/transaction">Transaction</Link>
      <br />
      <Link to="/client">Client</Link>
    </div>
  );
};
export default HomePage;
