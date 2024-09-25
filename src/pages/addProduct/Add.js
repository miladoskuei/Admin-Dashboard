import React, { useEffect, useState, useContext } from "react";
import { database } from "../../firebaseConfig";
import { ref, set } from "firebase/database";
import ProductsContext from "../../contexts/ProductsContext";
import ErrorModal from "../../components/Topbar/errorModal/ErrorModal";
import { Spinner } from "react-bootstrap";
import { TextField, Button, Container, Typography, Box } from "@mui/material";


const AddProduct = () => {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    products: Products,
    fetchProducts,
    isLoading: loading,
    isError: error,
  } = useContext(ProductsContext);

  useEffect(() => {
    if (Products && Products.length > 0) {
      const lastProduct = Products[Products.length - 1].code;
      setProductCode(lastProduct + 1);
    } else {
      setProductCode(1);
    }
  }, [Products]);

  useEffect(() => {
    setIsLoading(isLoading);
    setIsError(isError);
  }, [isLoading, isError]);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newProduct = {
      code: productCode,
      name: productName,
      price: productPrice,
      stock: productStock,
    };
    console.log(newProduct);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("check your network please")), 5000)
    );

    const addProductPromise = set(
      ref(database, "products/" + productCode),
      newProduct
    )
      .then(() => {
        setIsLoading(false);
        setMessage("محصول با موفقیت اضافه شد!");
        setProductCode((prev) => Number(prev) + 1);
        setProductName("");
        setProductPrice("");
        setProductStock("");
        fetchProducts();
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.error("Error adding product:", error);
        setMessage("خطا در اضافه کردن محصول.");
      });

    Promise.race([addProductPromise, timeoutPromise])
      .finally(() => setIsLoading(false))
      .catch((error) => {
        setIsError(true);
        console.error(error);
        setMessage(error.message);
      });
  };

  return (
    <div className="container">


    <Container maxWidth="sm" style={{flex:4}}>
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
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Add New Product{" "}
        </Typography>{" "}
        <TextField
          label="Product Code"
          value={productCode}
          disabled
          fullWidth
        />
        <TextField
          label="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Product Price"
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Product Stock"
          type="number"
          value={productStock}
          onChange={(e) => setProductStock(e.target.value)}
          required
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Add Product{" "}
        </Button>{" "}
      </Box>{" "}
      {isLoading && <Spinner></Spinner>}{" "}
      {message && (
        <ErrorModal
          message={message}
          onClose={() => {
            setMessage(null);
          }}
        />
      )}{" "}
    </Container>
    </div>
  );
};

export default AddProduct;
