import React, { createContext, useState, useEffect } from "react";
import { fetchDatas } from "../helpers/fetch";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDatas(
        "https://myproject-4e193-default-rtdb.firebaseio.com/products.json"
      );
      if (data) {
        const transformedArray = data.map((subArray) => subArray[1]);
        const finalArray = transformedArray.filter((item) => item !== null);
        setProducts(finalArray);
        console.log("final array: ", finalArray);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, fetchProducts, isLoading, error }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
