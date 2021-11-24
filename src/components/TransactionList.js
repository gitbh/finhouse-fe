import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const INITIAL_TRANSACTION_LIST_PARAMS = {
  fromDate: "",
  toDate: "",
  merchant: "",
  acquirer: "",
};

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [params, setParams] = useState(INITIAL_TRANSACTION_LIST_PARAMS);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://finhouse-reporting.herokuapp.com/api/v1/transaction/list",
        params,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setTransactions([...transactions, response.data]);
        console.log(transactions);
      })
      .catch((error) => {
        console.log(error);
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

      <h3>Transaction List Search</h3>
      <form
        className="ui form"
        onSubmit={(event) => {
          handleSearchSubmit(event, params);
          setParams(INITIAL_TRANSACTION_LIST_PARAMS);
        }}
      >
        <input
          name="fromDate"
          type="text"
          placeholder="From Date"
          onChange={handleOnChange}
          value={params.fromDate}
        />
        <input
          name="toDate"
          placeholder="To Date"
          type="text"
          onChange={handleOnChange}
          value={params.toDate}
        />
        <input
          name="merchant"
          placeholder="Merchant"
          type="text"
          onChange={handleOnChange}
          value={params.merchant}
        />
        <input
          name="acquirer"
          placeholder="Acquirer"
          type="text"
          onChange={handleOnChange}
          value={params.acquirer}
        />
        <button className="ui blue button" type="submit">
          Search
        </button>
      </form>

      {transactions.map((transaction) => {
        return (
          <div key={transaction.id} className="ui relaxed divided list">
            <div className="item">
              <div className="content">
                {transaction.data.map((trx) => {
                  return (
                    <div className="ui bulleted list">
                      <div className="item">
                        <div>Customer Info</div>
                        <div className="list">
                          <div className="item">
                            Number: {trx.customerInfo.number}
                          </div>
                          <div className="item">
                            Email: {trx.customerInfo.email}
                          </div>
                        </div>
                      </div>

                      <div className="item">Updated at: {trx.updated_at}</div>
                      <div className="item">Created at: {trx.created_at}</div>

                      <div className="item">
                        <div>Fx Merchant</div>
                        <div className="list">
                          <div className="item">
                            Original Amount: {trx.fx.merchant.originalAmount}
                          </div>
                          <div className="item">
                            Original Currency:{" "}
                            {trx.fx.merchant.originalCurrency}
                          </div>
                        </div>
                      </div>

                      <div className="item">
                        <div>Acquirer</div>
                        <div className="list">
                          <div className="item">ID: {trx.acquirer.id}</div>
                          <div className="item">Name: {trx.acquirer.name}</div>
                          <div className="item">Code: {trx.acquirer.code}</div>
                          <div className="item">Type: {trx.acquirer.type}</div>
                        </div>
                      </div>

                      <div className="item">
                        <div>Transaction Merchant</div>
                        <div className="list">
                          <div className="item">
                            Reference No: {trx.transaction.merchant.referenceNo}
                          </div>
                          <div className="item">
                            Status: {trx.transaction.merchant.status}
                          </div>
                          <div className="item">
                            transactionId:{" "}
                            {trx.transaction.merchant.transactionId}
                          </div>
                        </div>
                      </div>

                      <div className="item">Refundable: {trx.refundable}</div>

                      <div className="item">
                        <div>Merchant</div>
                        <div className="list">
                          <div className="item">ID: {trx.merchant.id}</div>
                          <div className="item">Name: {trx.merchant.name}</div>
                        </div>
                      </div>

                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TransactionList;
