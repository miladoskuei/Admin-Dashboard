import Home from "../../pages/Home/Home";
import Users from "../../pages/Users/Users";

import Products from "../../pages/products/Products";
import Product from "../../pages/product/Product";
import AddProduct from "../../pages/addProduct/Add.js";
import AddUser from "../../pages/addUser/AddUser.js";
import { element } from "prop-types";
import User from "../../pages/user/User";

const myroutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Addproducts",
    element: <AddProduct />,
  },
  {
    path: "/AddUser",
    element: <AddUser />,
  },
  {
    path: "/users",
    element: <Users />,
  },

  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "*",
    element: <h1> Page not found </h1>,
  },
  {
    path: "/products/:productId",
    element: <Product />,
  },
  {
    path: "/users/:userId",
    element: <User />,
  },
];
export default myroutes;
