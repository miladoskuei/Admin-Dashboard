import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { ref, remove } from "firebase/database";
import { database } from "../../firebaseConfig";
import { Spinner } from "react-bootstrap";
import ErrorModal from "../../components/Topbar/errorModal/ErrorModal";
import TransactionsContext from "../../contexts/TransactionContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AuthContext from "../../contexts/Islogin";
import "./Transactions.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [showError, setShowError] = useState(true);
  const { LogedInUsername } = useContext(AuthContext);

  const {
    transactions: transactionsContext,
    fetchTransactions,
    isLoading,
    error,
    fetchTransactionsWithTimeout,
  } = useContext(TransactionsContext);

  const handleCloseError = () => {
    setShowError(false);
  };

  useEffect(() => {
    setTransactions(transactionsContext);
  }, [transactionsContext]);

  const deleteTransaction = async (id) => {
    try {
      await remove(ref(database, `transactions/${id}`));
      fetchTransactionsWithTimeout();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const columns = [
    { field: "transactionId", headerName: "Transaction ID", width: 200 },
    { field: "userId", headerName: "User ID", width: 200 },
    {
      field: "productId",
      headerName: "Product ID",
      width: 200,
      renderCell: (params) => {
        console.log('params', params);
        if(params.row.productQuantities){
          let mystr = ''
          {params.row.productQuantities.map((product,index) => (
            mystr += product.productId + (index < params.row.productQuantities.length - 1? ',': '')
          ))}
          console.log('mystr',mystr);
          return (
            
            <div>

              {mystr}

            </div>
          );
        }
        
      },
    },
    { 
      field: "quantity",
       headerName: "Quantity",
        width: 150 ,
        renderCell: (params) => {
          if(params.row.productQuantities){
            let mystr = 0
            {params.row.productQuantities.map((product,index) => (
              mystr += Number(product.quantity) 
            ))}
            console.log('mystr',mystr);
            return (
              
              <div>

                {mystr}

              </div>
            );
          }
        }

      },
    { field: "totalPrice", headerName: "Total Price", width: 150 },
    { field: "transactionDate", headerName: "Transaction Date", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div className="btncontainer">
              <Link
                className="edit"
                to={`/transactions/${params.row.transactionId}`}
              >
                <button className="btnEdit"> Edit </button>
              </Link>
              <div className="iconcontainer">
                <DeleteOutlineIcon
                  onClick={() => {
                    deleteTransaction(params.row.transactionId);
                  }}
                  className="deleteBtn"
                />
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="transactions-container">
      <div className="transactions-table">
        {isLoading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : error && showError ? (
          <ErrorModal
            onClose={handleCloseError}
            message="Check your network access please"
          />
        ) : (
          <DataGrid
            className="data-grid"
            rows={transactions}
            columns={columns}
            getRowId={(row) => row.transactionId}
          />
        )}
      </div>
      <Link to={`/${LogedInUsername}/AddTransaction`}>
        <button className="transactionAddButton"> Add Transaction </button>
      </Link>
    </div>
  );
}
