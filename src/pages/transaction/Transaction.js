import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../../firebaseConfig";
import { ref, get, update, remove } from "firebase/database";
import TransactionsContext from "../../contexts/TransactionContext";
import UsersContext from "../../contexts/UsersContexts";
import ProductsContext from "../../contexts/ProductsContext";
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

const EditTransaction = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const { fetchTransactions } = useContext(TransactionsContext);
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { users } = useContext(UsersContext);
  const { products } = useContext(ProductsContext);

  useEffect(() => {
    // console.log('id:',id)
    const fetchTransaction = async () => {
      try {
        const transactionRef = ref(database, `transactions/${transactionId}`);
        console.log(transactionRef);
        const snapshot = await get(transactionRef);
        if (snapshot.exists()) {
          setTransaction(snapshot.val());
        } else {
          setMessage("Transaction not found");
        }
      } catch (error) {
        setMessage("Error fetching transaction");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransaction();
  }, [transactionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const transactionRef = ref(database, `transactions/${transactionId}`);
      await update(transactionRef, transaction);
      setMessage("Transaction updated successfully");
      fetchTransactions();
      navigate("/transactions");
    } catch (error) {
      setMessage("Error updating transaction");
    }
  };

  const handleDelete = async () => {
    try {
      const transactionRef = ref(database, `transactions/${transactionId}`);
      await remove(transactionRef);
      setMessage("Transaction deleted successfully");
      fetchTransactions();
      navigate("/transactions");
    } catch (error) {
      setMessage("Error deleting transaction");
    }
  };

  // const handleProductChange = (event, index) => {
  //   const { name, value } = event.target;
  //   const updatedProductQuantities = [...productQuantities];
  //   updatedProductQuantities[index] = {
  //     ...updatedProductQuantities[index],
  //     [name]: value,
  //   };
  //   setProductQuantities(updatedProductQuantities);
  // };

  const handleProductChange = (event, index) => {
    const { name, value } = event.target;
    setTransaction((prev) => {
      const updatedProductQuantities = [...prev.productQuantities];
      updatedProductQuantities[index] = {
        ...updatedProductQuantities[index],
        [name]: value,
      };
      console.log('new transition,',{...prev, productQuantities: updatedProductQuantities })
      return { ...prev, productQuantities: updatedProductQuantities };
    });
  };

  function calculateTotal(myProduct) {
    let product = products.find((p) => p.code === myProduct.productId);
    if (product) {
      return product.price * myProduct.quantity;
    }
    return 0;
  }

  console.log("transaction", transaction);

  if (isLoading) {
    return <div> Loading... </div>;
  }

  if (!transaction) {
    return <div> {message} </div>;
  }

  if (isLoading) {
    return <div> Loading... </div>;
  }

  if (!transaction) {
    return <div> {message} </div>;
  }

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 5,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Edit Transaction{" "}
        </Typography>{" "}
        <TextField
          label="Transaction ID"
          value={transaction.transactionId || ""}
          disabled
          fullWidth
        />
        <TextField
          select
          label="User ID"
          name="userId"
          value={transaction.userId || ""}
          onChange={handleChange}
          fullWidth
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
        {transaction.productQuantities.map((p, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id={`product-label-${index}`}>
                  Product Code{" "}
                </InputLabel>{" "}
                <Select
                  labelId={`product-label-${index}`}
                  name="productId"
                  value={p.productId}
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
                value={p.quantity}
                onChange={(e) => handleProductChange(e, index)}
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
                value={calculateTotal(p)}
                required
                fullWidth
                inputProps={{ min: 0 }}
                disabled
                className="responsive-input"
              />
            </Grid>{" "}
          </Grid>
        ))}{" "}
        <TextField
          label="Quantity"
          type="number"
          name="quantity"
          value={transaction.quantity || ""}
          onChange={handleChange}
          fullWidth
          inputProps={{ min: 0 }}
        />{" "}
        <TextField
          label="Total Price"
          type="number"
          name="totalPrice"
          value={transaction.totalPrice || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Transaction Date"
          type="datetime-local"
          name="transactionDate"
          value={transaction.transactionDate || ""}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />{" "}
        <TextField
          select
          label="Payment Method"
          name="paymentMethod"
          value={transaction.paymentMethod || ""}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Cash"> Cash </MenuItem>{" "}
          <MenuItem value="Online Payment"> Online Payment </MenuItem>{" "}
          <MenuItem value="Credit"> Credit </MenuItem>{" "}
        </TextField>{" "}
        <TextField
          label="Status"
          name="status"
          value={transaction.status || ""}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes{" "}
        </Button>{" "}
        <Button variant="outlined" color="secondary" onClick={handleDelete}>
          Delete Transaction{" "}
        </Button>{" "}
        {message && <div> {message} </div>}{" "}
      </Box>{" "}
    </Container>
  );
};

export default EditTransaction;
