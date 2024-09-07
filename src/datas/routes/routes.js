import Home from "../../pages/Home/Home";
import Users from "../../pages/Users/Users";
import Newuser from "../../pages/Newusers/Newuser";
import Products from "../../pages/products/Products";
import Product from "../../pages/product/Product";

const myroutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/newUser",
    element: <Newuser />,
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
    element:<Product />
  }
];
export default myroutes;
