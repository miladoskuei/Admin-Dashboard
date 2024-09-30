import React, { useEffect, useState, useContext } from "react";
import { database } from "../../firebaseConfig";
import { ref, set } from "firebase/database";
import TransactionsContext from "../../contexts/TransactionContext";
import ProductsContext from "../../contexts/ProductsContext";
import UsersContext from "../../contexts/UsersContexts";
import ErrorModal from "../../components/Topbar/errorModal/ErrorModal";
import { Spinner } from "react-bootstrap";
import "./addTransaction.css";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { func } from "prop-types";
import Products from "../products/Products";

const AddTransaction = () => {
  const [transactionId, setTransactionId] = useState("");
  const [userId, setUserId] = useState("");
  const [productQuantities, setProductQuantities] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { users } = useContext(UsersContext);
  const { products } = useContext(ProductsContext);

  const {
    transactions: Transactions,
    fetchTransactions,
    isLoading: loading,
    isError: error,
  } = useContext(TransactionsContext);

  useEffect(() => {
    if (Transactions && Transactions.length > 0) {
      const lastTransaction =
        Transactions[Transactions.length - 1].transactionId;
      setTransactionId(lastTransaction + 1);
    } else {
      setTransactionId(1);
    }
  }, [Transactions]);

  useEffect(() => {
    setIsLoading(isLoading);
    setIsError(isError);
  }, [isLoading, isError]);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    setTotalPrice(calculateTotalPrice());
    const newTransaction = {
      transactionId,
      userId,
      productQuantities,
      totalPrice,
      transactionDate,
      paymentMethod,
      status,
    };
    console.log(newTransaction);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("check your network please")), 5000)
    );

    const addTransactionPromise = set(
      ref(database, "transactions/" + transactionId),
      newTransaction
    )
      .then(() => {
        setIsLoading(false);
        setMessage("تراکنش با موفقیت اضافه شد!");
        setTransactionId((prev) => Number(prev) + 1);
        setUserId("");
        setProductQuantities([]);
        setTotalPrice("");
        setTransactionDate("");
        setPaymentMethod("");
        setStatus("");
        fetchTransactions();
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.error("Error adding transaction:", error);
        setMessage("خطا در اضافه کردن تراکنش.");
      });

    Promise.race([addTransactionPromise, timeoutPromise])
      .finally(() => setIsLoading(false))
      .catch((error) => {
        setIsError(true);
        console.error(error);
        setMessage(error.message);
      });
  };

  const handleProductChange = (event, index) => {
    const { name, value } = event.target;
    const updatedProductQuantities = [...productQuantities];
    updatedProductQuantities[index] = {
      ...updatedProductQuantities[index],
      [name]: value,
    };
    setProductQuantities(updatedProductQuantities);


  };

useEffect(() => {
  setTotalPrice(calculateTotalPrice());
  }, [productQuantities]);
  

  const addProductField = () => {
    setProductQuantities([
      ...productQuantities,
      { productId: "", quantity: "" },
    ]);
  };

  function calculateTotal(myProduct) {
    let product = products.find((p) => p.code === myProduct.productId);
    if (product) {
      return product.price * myProduct.quantity;
    }
    return 0;
  }

  function findProductById(productId) {
    return products.find((p) => p.code === productId);
  }

  function calculateTotalPrice() {
    let total = 0;

    productQuantities.forEach((p) => {
      let product = findProductById(p.productId);
      if (product) {
        total += product.price * p.quantity;
      }
    });
    // setTotalPrice(total)
    return total;
  }

  return (
    <div
      className="container"
      style={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <Container
        maxWidth="sm"
        style={{ flex: 4, minHeight: "100vh", height: "100%" }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 5,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
            flexGrow: 1,
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Add New Transaction{" "}
          </Typography>{" "}
          <TextField
            label="Transaction ID"
            value={transactionId}
            disabled
            fullWidth
            className="responsive-input"
          />
          <TextField
            select
            label="User Code"
            value={userId || ""}
            onChange={(e) => setUserId(e.target.value)}
            required
            fullWidth
            className="responsive-input"
          >
            <MenuItem value="" disabled>
              <em> Select a User </em>{" "}
            </MenuItem>{" "}
            {users &&
              users.map((user) => (
                <MenuItem key={user.code} value={user.code}>
                  {" "}
                  {user.code}{" "}
                </MenuItem>
              ))}{" "}
          </TextField>{" "}
          {productQuantities.map((productQuantity, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id={`product-label-${index}`}>
                    Product Code{" "}
                  </InputLabel>{" "}
                  <Select
                    labelId={`product-label-${index}`}
                    name="productId"
                    value={productQuantity.productId}
                    onChange={(e) => handleProductChange(e, index)}
                    required
                    className="responsive-input"
                  >
                    <MenuItem value="" disabled>
                      <em> Select a Product </em>{" "}
                    </MenuItem>{" "}
                    {products &&
                      products.map((product) => (
                        <MenuItem key={product.code} value={product.code}>
                          {" "}
                          {product.code}{" "}
                        </MenuItem>
                      ))}{" "}
                  </Select>{" "}
                </FormControl>{" "}
              </Grid>{" "}
              <Grid item xs={4}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={productQuantity.quantity}
                  onChange={(e) => {
                    handleProductChange(e, index);
                  }}
                  required
                  fullWidth
                  inputProps={{ min: 0 }}
                  className="responsive-input"
                />
              </Grid>{" "}
              <Grid item xs={4}>
                <TextField
                  label="total amount"
                  name="total amount"
                  type="number"
                  value={calculateTotal(productQuantity)}
                  required
                  fullWidth
                  inputProps={{ min: 0 }}
                  disabled
                  className="responsive-input"
                />
              </Grid>{" "}
            </Grid>
          ))}{" "}
          <Button
            variant="contained"
            color="secondary"
            onClick={addProductField}
            className="responsive-input"
          >
            Add Product{" "}
          </Button>{" "}
          <TextField
            label="Total Price"
            type="number"
            value={totalPrice}
            // onChange={(e) => setTotalPrice(e.target.value)}
            required
            fullWidth
            inputProps={{ min: 0 }}
            className="responsive-input"
            InputLabelProps={{ shrink: true }}
            disabled
          />
          <TextField
            label="Transaction Date"
            type="datetime-local"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            className="responsive-input"
          />
          <TextField
            select
            label="Payment Method"
            value={paymentMethod || ""}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            fullWidth
            className="responsive-input"
          >
            <MenuItem value="" disabled>
              <em> Select a Payment Method </em>{" "}
            </MenuItem>{" "}
            <MenuItem value="Cash"> Cash </MenuItem>{" "}
            <MenuItem value="Online Payment"> Online Payment </MenuItem>{" "}
            <MenuItem value="Credit"> Credit </MenuItem>{" "}
          </TextField>{" "}
          <TextField
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            fullWidth
            className="responsive-input"
          />
          <Button variant="contained" color="primary" type="submit">
            Add Transaction{" "}
          </Button>{" "}
        </Box>{" "}
        {isLoading && <Spinner />}{" "}
        {message && (
          <ErrorModal
            message={message}
            onClose={() => {
              setMessage(null);
            }}
          />
        )}{" "}
      </Container>{" "}
    </div>
  );
};

export default AddTransaction;
