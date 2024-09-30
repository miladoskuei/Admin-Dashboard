import React, { createContext, useState, useEffect } from "react";
import { fetchDatas } from "../helpers/fetch";
import ErrorModal from "../components/Topbar/errorModal/ErrorModal";
import { useLocation } from "react-router-dom";

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  let errorFlag = false;

  const fetchTransactionsWithTimeout = () => {
    return Promise.race([
      fetchTransactions(),
      new Promise((_, reject) =>
        setTimeout(() => {
          reject(new Error("Request timed out"));
          errorFlag = true;
        }, 5000)
      ),
    ]);
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDatas(
        "https://myproject-4e193-default-rtdb.firebaseio.com/transactions.json"
      );
      if (data) {
        console.log("data:", data);
        const transformedArray = data.map((subArray) => subArray[1]);
        const finalArray = transformedArray.filter((item) => item !== null);
        setTransactions(finalArray);
        console.log("final array: ", finalArray);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      if (!errorFlag) {
        setError(error.message);
      }
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionsWithTimeout().catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        isLoading,
        error,
        fetchTransactionsWithTimeout,
      }}
    >
      {children}{" "}
      {error && (
        <ErrorModal
          message={error}
          onClose={() => {
            setError(null);
          }}
        />
      )}{" "}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext;
