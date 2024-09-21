// import React, { useState } from "react";
// import { database } from "../../firebaseConfig";
// import { ref, set } from "firebase/database";

// const AddProduct = () => {
//   const [productCode, setProductCode] = useState("");
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productStock, setProductStock] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newProduct = {
//       code: productCode,
//       name: productName,
//       price: productPrice,
//       stock: productStock,
//     };
//   };
import React, { useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { ref, set } from "firebase/database";
import { fetchDatas } from "../../helpers/fetch";
import { useContext } from "react";
import ProductsContext from "../../contexts/ProductsContext";

const AddProduct = () => {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [message, setMessage] = useState("");

  const { products : Products, fetchProducts } = useContext(ProductsContext);

  useEffect(() => {
    if (Products && Products.length > 0) {
      const lastProduct = Products[Products.length - 1].code;
      setProductCode(lastProduct + 1);
    } else {
      setProductCode(1);
    }
  }, [Products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      code: productCode,
      name: productName,
      price: productPrice,
      stock: productStock,
    };
    console.log(newProduct);

    set(ref(database, "products/" + productCode), newProduct)
      .then(() => {
        setMessage("محصول با موفقیت اضافه شد!");
        setProductCode((prev) => Number(prev) + 1);
        setProductName("");
        setProductPrice("");
        setProductStock("");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        setMessage("خطا در اضافه کردن محصول.");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputGroupStyle}>
        <label> product code: </label>{" "}
        <input
          disabled
          style={inputs}
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          required
        />
      </div>{" "}
      <div style={inputGroupStyle}>
        <label> product name: </label>{" "}
        <input
          style={inputs}
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>{" "}
      <div style={inputGroupStyle}>
        <label> product price: </label>{" "}
        <input
          style={inputs}
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          min="0"
          required
        />
      </div>{" "}
      <div style={inputGroupStyle}>
        <label> product count: </label>{" "}
        <input
          style={inputs}
          type="number"
          value={productStock}
          onChange={(e) => setProductStock(e.target.value)}
          min="0"
          required
        />
      </div>{" "}
      <button type="submit" style={buttonStyle}>
        اضافه کردن محصول{" "}
      </button>{" "}
      {message && <p> {message} </p>}{" "}
    </form>
  );
};

const formStyle = {
  flex: 4,
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "white",
};

const inputGroupStyle = {
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between",
  width: "24rem",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  maxWidth: "12rem",
};
const inputs = {
  border: "none",
  border: "1px solid #007bff",
  backgroundColor: "#f2f8f8",
  borderRadius: "1rem",
  padding: "0.5rem",
  fontWeight: "bold",
};

export default AddProduct;
