import Home from "../../pages/Home/Home";
import Users from "../../pages/Users/Users";

import Products from "../../pages/products/Products";
import Product from "../../pages/product/Product";
import AddProduct from "../../pages/addProduct/Add.js";
import AddUser from "../../pages/addUser/AddUser.js";
import { element } from "prop-types";
import User from "../../pages/user/User";
import Transactions from "../../pages/transactions/Transactions";
import AddTransaction from "../../pages/addTransaction/AddTransaction";
import Transaction from "../../pages/transaction/Transaction";
import Faq from "../../components/Topbar/FAQ/Faq.js";
import AddFaq from "../../components/Topbar/addFaq/addFaq.js";
import Admins from "../../pages/admins/Admins.js";
import AddAdmin from "../../pages/admins/AddAdmin.js";
import LoginForm from "../../pages/LoginForm/LoginForm.js";

const myroutes = [
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/:username/home",
    element: <Home />,
  },
  {
    path: "/:username/admins",
    element: <Admins />,
  },
  {
    path: "/:username/addadmin",
    element: <AddAdmin />,
  },
  {
    path: "/:username/addproducts",
    element: <AddProduct />,
  },
  {
    path: "/:username/adduser",
    element: <AddUser />,
  },
  {
    path: "/:username/addtransaction",
    element: <AddTransaction />,
  },
  {
    path: "/:username/users",
    element: <Users />,
  },
  {
    path: "/:username/products",
    element: <Products />,
  },
  {
    path: "/:username/transactions",
    element: <Transactions />,
  },
  {
    path: "/:username/faq",
    element: <Faq />,
  },
  {
    path: "/:username/faq/add",
    element: <AddFaq />,
  },
  {
    path: "*",
    element: <h1> Page not found </h1>,
  },
  {
    path: "/:username/products/:productId",
    element: <Product />,
  },
  {
    path: "/:username/users/:userId",
    element: <User />,
  },
  {
    path: "/:username/transactions/:transactionId",
    element: <Transaction />,
  },
];
export default myroutes;
