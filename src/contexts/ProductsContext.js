import React, { createContext, useState, useEffect } from "react";
import { fetchDatas } from "../helpers/fetch";
import ErrorModal from "../components/Topbar/errorModal/ErrorModal";
import { useLocation } from "react-router-dom";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  let errorFlag = false;

  const fetchProductsWithTimeout = () => {
    return Promise.race([
      fetchProducts(),
      new Promise((_, reject) =>
        setTimeout(() => {
          reject(new Error("Request timed out"));
          errorFlag = true;
        }, 5000)
      ),
    ]);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
 

      const data = await fetchDatas(
        "https://myproject-4e193-default-rtdb.firebaseio.com/products.json"
      );
      if (data) {
        console.log("data:", data);
        const transformedArray = data.map((subArray) => subArray[1]);
        const finalArray = transformedArray.filter((item) => item !== null);
        setProducts(finalArray);
        console.log("final array: ", finalArray);
      } else {
        setProducts([]);
      }
    } catch (error) {
      if (!errorFlag) {
        setError(error.message);
      }
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsWithTimeout().catch((error) => {
      setError(error.message);
      setIsLoading(false)
    });
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
        isLoading,
        error,
        fetchProductsWithTimeout,
      }}
    >
      {children}{" "}
      {error && (
        <ErrorModal
          message={error}
          onClose={() => {
            setError(null);
          }}
        >
          {" "}
        </ErrorModal>
      )}{" "}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
