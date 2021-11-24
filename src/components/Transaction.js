import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const INITIAL_TRANSACTION_PARAM = {
  transactionId: ""
};

const Transaction = () => {
  const [transaction, setTransaction] = useState();
  const [params, setParams] = useState(INITIAL_TRANSACTION_PARAM);
  const [showResults, setShowResults] = useState(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(params);
    axios
      .post(
        "https://finhouse-reporting.herokuapp.com/api/v1/transaction",
        params,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
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
      <h3>Transaction Search</h3>
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
                      Email: {transaction.customerInfo.email}
                    </div>
                  </div>
                </div>

                <br />
                <div className="item">
                  <div>Fx Merchant</div>
                  <div className="list">
                    <div className="item">
                      Original Amount: {transaction.fx.merchant.originalAmount}
                    </div>
                    <div className="item">
                      Original Currency:{" "}
                      {transaction.fx.merchant.originalCurrency}
                    </div>
                  </div>
                </div>

                <br />
                <div className="item">
                  <div>Transaction Merchant</div>
                  <div className="list">
                    <div className="item">
                      Reference No:{" "}
                      {transaction.transaction.merchant.referenceNo}
                    </div>
                    <div className="item">
                      Original Currency:{" "}
                      {transaction.transaction.merchant.merchantId}
                    </div>
                  </div>
                </div>

                <br />
                <div className="item">
                  <div>Merchant</div>
                  <div className="list">
                    <div className="item">
                      Merchant Name: {transaction.merchant.name}
                    </div>
                  </div>
                </div>

                {/* <p>{transaction.from}</p> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Transaction;
