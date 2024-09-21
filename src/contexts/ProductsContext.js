import React, { createContext, useState, useEffect } from "react";
import { fetchDatas } from "../helpers/fetch";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await fetchDatas(
        "https://myproject-4e193-default-rtdb.firebaseio.com/products.json"
      );
      const transformedArray = data.map((subArray) => subArray[1]);
      const finalArray = transformedArray.filter((item) => item !== null);
      setProducts(finalArray);
      console.log('final array: ', finalArray)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
