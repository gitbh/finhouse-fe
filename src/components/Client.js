import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const INITIAL_TRANSACTION_PARAM = {
  transactionId: "",
};

const Client = () => {
  const [transaction, setTransaction] = useState();
  const [params, setParams] = useState(INITIAL_TRANSACTION_PARAM);
  const [showResults, setShowResults] = useState(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(params);
    axios
      .post("http://localhost:8080/api/v1/transaction", params, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTransaction(response.data);
        setShowResults(true);
        console.log(transaction);
      })
      .catch((error) => {
        console.log(error);
        setShowResults(false);
      });
  };

  const handleOnChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div>
        <Link to="/transactionList">Transaction List</Link>
        <br />
        <Link to="/transaction">Transaction</Link>
        <br />
        <Link to="/client">Client</Link>
      </div>
      <h3>Client Search</h3>
      <form
        className="ui form"
        onSubmit={(event) => {
          handleSearchSubmit(event, params);
          setParams(INITIAL_TRANSACTION_PARAM);
        }}
      >
        <input
          name="transactionId"
          type="text"
          placeholder="Transaction Id"
          onChange={handleOnChange}
          value={params.transactionId}
        />
        <button className="ui blue button" type="submit">
          Search
        </button>
      </form>

      {showResults ? (
        <div className="ui relaxed divided list">
          <h3>Transaction</h3>
          <div className="item">
            <div className="content">
              <div className="ui bulleted list">
                <div className="item">
                  <div>Customer Info</div>
                  <div className="list">
                    <div className="item">
                      Billing First Name:{" "}
                      {transaction.customerInfo.billingFirstName}
                    </div>
                    <div className="item">
                      Billing Last Name:{" "}
                      {transaction.customerInfo.billingLastName}
                    </div>
                    <div className="item">
                      Billing Country: {transaction.customerInfo.billingCountry}
                    </div>
                    <div className="item">
                      Email: {transaction.customerInfo.email}
                    </div>
                    <div className="item">
                      Updated at: {transaction.customerInfo.updated_at}
                    </div>
                    <div className="item">
                      Created at: {transaction.customerInfo.created_at}
                    </div>
                    <div className="item">
                      ID: {transaction.customerInfo.id}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Client;