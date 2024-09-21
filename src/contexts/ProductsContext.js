// import { createContext } from "react";

// export const ProductsContext = createContext();
import { fetchDatas } from "../helpers/fetch";

import React, { createContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  ////

  useEffect(() => {
    fetchDatas(
      "https://myproject-4e193-default-rtdb.firebaseio.com/products.json"
    )
      .then((data) => {
        const transformedArray = data.map((subArray) => subArray[1]);
        const finalArray = transformedArray.filter((item) => {
          return item !== null;
        });

        setProducts(finalArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //

  // useEffect(() => {
  // const fetchProducts = async () => {
  // const res = await fetch("https://myproject-4e193-default-rtdb.firebaseio.com/products.json");
  // const data = await res.json();
  // setProducts(data);
  // };

  // fetchProducts();
  // }, []);

  return (
    <ProductsContext.Provider value={products}>
      {" "}
      {children}{" "}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
