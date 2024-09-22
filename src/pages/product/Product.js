import React, { useState } from "react";
import "./product.css";
import Chart from "../../components/Topbar/chart/Chart";
import { product as productDatas } from "../../datas/routes/productData";
import PublishIcon from "@mui/icons-material/Publish";
import { useMediaQuery } from "react-responsive";
import { database } from "../../firebaseConfig";
import { useEffect } from "react";
import { ref, get, update } from "firebase/database";
import { useParams } from "react-router-dom";
import ProductsContext from "../../contexts/ProductsContext";
import { useContext } from "react";
export default function Product() {
  // const isLarge = useMediaQuery({ minWidth: 1540 });
  const isSmall = useMediaQuery({ maxWidth: 700 });

  const { fetchProducts} = useContext(ProductsContext);

  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productInventory, setProductInventory] = useState("");
  const [componentKey, setComponentKey] = useState(Date.now());
  const { productId } = useParams();

  console.log(database);
  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = ref(database, "products/" + `${productId}`); // Assuming "2" is the product ID
      const snapshot = await get(productRef);
      console.log("Current product data:", snapshot.val());

      if (snapshot.exists()) {
        setProduct(snapshot.val());
        setProductName(snapshot.val().name);
        setProductPrice(snapshot.val().price);
        setProductInventory(snapshot.val().stock);
      } else {
        console.log("No such document!");
      }
    };

    fetchProduct();
  }, [productId, componentKey]);
  const updateProduct = async (productId, updatedProduct) => {
    const productRef = ref(database, `products/${productId}`);
    try {
      await update(productRef, updatedProduct);
      console.log("Product updated successfully!");
      fetchProducts(); // بهروزرسانی لیست محصولات پس ا�� ویرایش 
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const submitEditHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: productName,
      price: productPrice,
      stock: productInventory,
    };
    await updateProduct(productId, updatedProduct);

    alert("Product updated successfully!");
    setComponentKey(Date.now());
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1> {product.name} </h1>{" "}
      </div>{" "}
      <div className="productTop">
        <div
          className="productTopLeft"
          style={!isSmall ? { minWidth: "30rem" } : { minWidth: "auto" }}
        >
          <Chart
            yaxis="sale"
            title="products"
            grid
            data={productDatas}
            dataKey="sale"
          >
            {" "}
            ss{" "}
          </Chart>{" "}
        </div>{" "}
        <div
          className="productTopRight"
          style={!isSmall ? { minWidth: "30rem" } : { minWidth: "100%" }}
        >
          <div className="productInfoTop">
            <img
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt=""
              className="productInfoImg"
            />
            <span className="productName"> labtop </span>{" "}
          </div>{" "}
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <div className="productItemKey"> ID </div>{" "}
              <div className="productItemValue"> {product.code} </div>{" "}
            </div>{" "}
            <div className="productInfoItem">
              <div className="productItemKey"> Name: </div>{" "}
              <div className="productItemValue"> {product.name} </div>{" "}
            </div>{" "}
            <div className="productInfoItem">
              <div className="productItemKey"> price: </div>{" "}
              <div className="productItemValue"> {product.price} </div>{" "}
            </div>{" "}
            <div className="productInfoItem">
              <div className="productItemKey"> stock </div>{" "}
              <div className="productItemValue"> {product.stock} </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="productBottom">
        <form action="" onSubmit={submitEditHandler} className="productForm">
          <div className="productFormFeft">
            <label for=""> product name: </label>{" "}
            <input
              type="text"
              placeholder="del labtop"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />{" "}
            <label htmlFor=""> price </label>{" "}
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />{" "}
            <label htmlFor=""> inventory </label>{" "}
            <input
              type="number"
              value={productInventory}
              onChange={(e) => setProductInventory(e.target.value)}
            />{" "}
          </div>{" "}
          <div className="productFormRight">
            <div className="productUploader">
              <img
                className="productUploadImg"
                src={`${process.env.PUBLIC_URL}/logo192.png`}
                alt=""
              />
              <label for="">
                <PublishIcon> </PublishIcon>{" "}
              </label>{" "}
              <input type="file" style={{ display: "none" }} name="" id="" />
            </div>{" "}
            <button className="productButton"> upload Edit </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
