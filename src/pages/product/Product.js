import React from "react";
import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/Topbar/chart/Chart";
import { product } from "../../datas/routes/productData";
import PublishIcon from "@mui/icons-material/Publish";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const isLarge = useMediaQuery({ minWidth: 1540 });
  const isSmall = useMediaQuery({ maxWidth: 700 });
  console.log(product);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1> product name </h1>{" "}
        <Link to={'/Addproducts'}>
          <button
            className="productAddButton"
           
          >
            {" "}
            Add Product{" "}
          </button>{" "}
        </Link>{" "}
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
            data={product}
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
              <div className="productItemValue"> 132 </div>{" "}
            </div>{" "}
            <div className="productInfoItem">
              <div className="productItemKey"> Name: </div>{" "}
              <div className="productItemValue"> Dell labtop </div>{" "}
            </div>{" "}
            <div className="productInfoItem">
              <div className="productItemKey"> sale: </div>{" "}
              <div className="productItemValue"> 19000 % </div>{" "}
            </div>{" "}
            <div className="productInfoItem">
              <div className="productItemKey"> active </div>{" "}
              <div className="productItemValue"> yes </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="productBottom">
        <form action="" className="productForm">
          <div className="productFormFeft">
            <label for=""> product name: </label>{" "}
            <input type="text" placeholder="del labtop" />
            <label htmlFor=""> in stock </label>{" "}
            <select id="inStock">
              <option value=""> yes </option> <option value=""> no </option>{" "}
            </select>{" "}
            <label htmlFor=""> Active </label>{" "}
            <select id="inStock">
              <option value=""> yes </option> <option value=""> no </option>{" "}
            </select>{" "}
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
