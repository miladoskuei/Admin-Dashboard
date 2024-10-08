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
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/admins",
    element: <Admins/>,
  },
  {
    path: "/addadmin",
    element: <AddAdmin/>,
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
    path: "/AddTransaction",
    element: <AddTransaction />,
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
    path: "/transactions",
    element: <Transactions />,
  },
  {
    path: "/Faq",
    element: <Faq> </Faq>,
  },
  {
    path: "/faq/add",
    element: <AddFaq></AddFaq>,
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
  {
    path: "/transactions/:transactionId",
    element: <Transaction />,
  },
];
export default myroutes;
