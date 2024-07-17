import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
// import Table from 'react-bootstrap/Table';

// Mock API data
const apiData = {
  customers: [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Aya Elsaied" },
    { id: 3, name: "Mina Adel" },
    { id: 4, name: "Sarah Reda" },
    { id: 5, name: "Mohamed Saied" },
  ],
  transactions: [
    { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
    { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
    { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
    { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
    { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
    { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
    { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
    { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
    { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 },
  ],
};

const Work = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [filterAmount, setFilterAmount] = useState(0);

  useEffect(() => {
    const customersWithTransactions = apiData.customers.map((customer) => {
      return {
        ...customer,
        transactions: apiData.transactions.filter(
          (t) => t.customer_id === customer.id
        ),
      };
    });

    const filteredCustomers = customersWithTransactions.filter(
      (customer) =>
        customer.name.toLowerCase().includes(filterText.toLowerCase()) &&
        customer.transactions.some(
          (transaction) => transaction.amount >= filterAmount
        )
    );
    setCustomers(filteredCustomers);
  }, [filterText, filterAmount]);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const TransactionChart = () => {
    const chartData = {
      labels: selectedCustomer?.transactions.map((t) => t.date),
      datasets: [
        {
          label: "Total Transaction Amount",
          data: selectedCustomer?.transactions.map((t) => t.amount),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="w-50">
        <h2>{selectedCustomer?.name}'s Transactions</h2>
        <Bar data={chartData} />
      </div>
    );
  };

  return (
    <>
      <div>
        <h1 className=" text-center mb-5 mt-3">Customer Transaction App</h1>

        <div className="container-fluid d-flex justify-content-center ">
          <label htmlFor="x" className="me-4  text-danger"> inter name :</label>
          <input
          id="x"
            className="input-group mb-3 w-25 border-radios text-center me-4"
            type="text"
            placeholder="Filter by customer name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />

          <label htmlFor="y" className="me-4 text-danger"> inter amount :</label>

          <input
            id="y"
            className="input-group mb-3 w-25 border-radios text-center me-4"
            type="number"
            placeholder="Filter by transaction amount"
            value={filterAmount}
            onChange={(e) => setFilterAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Transaction Amount</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody className="table-active">
            {customers.map((customer) =>
              customer.transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  onClick={() => handleCustomerSelect(customer)}
                >
                  <td>{customer.name}</td>
                  <td>{transaction.amount.toFixed(2)}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {selectedCustomer && <TransactionChart />}
      </div>
    </>
  );
};

export default Work;
