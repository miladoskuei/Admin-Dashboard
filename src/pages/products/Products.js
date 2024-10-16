import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import "./products.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext } from "react";
import ProductsContext from "../../contexts/ProductsContext";
import { ref, remove } from "firebase/database";
import { database } from "../../firebaseConfig";
import { Spinner } from "react-bootstrap";
import ErrorModal from "../../components/Topbar/errorModal/ErrorModal";
import AuthContext from "../../contexts/Islogin";
// import "DeleteOutlineIcon" from "@mui/icons-material/DeleteOutline";

export default function Products() {
  const [products, setproducts] = useState([]);
  const { LogedInUsername } = useContext(AuthContext);

  const [showError, setShowError] = useState(true);

  const {
    products: productsContext,
    fetchProducts,
    isLoading,
    error,
    fetchProductsWithTimeout,
  } = useContext(ProductsContext);

  const handleCloseError = () => {
    setShowError(false);
  };

  useEffect(() => {
    setproducts(productsContext);
  }, [productsContext]);

  // function deleteProdcuts(id) {
  //   console.log(id);
  //   const updatedProducts = products.filter((product) => product.code !== id);
  //   setproducts(updatedProducts);
  //   console.log(products)
  // }

  const deleteProduct = async (code) => {
    try {
      await remove(ref(database, `products/${code}`));
      fetchProductsWithTimeout(); // بهروزرسانی لیست محصولات پس از حذف
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  function editProduct(params) {
    console.log(params);
    params.edtable = true;
  }

  const columns = [
    {
      field: "code",
      headerName: "id",
      width: 200,
    },
    {
      editable: true,
      field: "name",
      headerName: "title",
      width: 200,
    },
    {
      field: "price",
      headerName: "price",
      width: 240,
    },
    {
      field: "stock",
      headerName: "Inventory",
      width: 240,
    },
    {
      field: "action",
      headerName: "action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div className="btncontainer">
              <Link className="edit" to={`/products/${params.row.code}`}>
                <button className="btnEdit"> Edit </button>{" "}
              </Link>{" "}
              <div className="iconcontainer">
                <DeleteOutlineIcon
                  onClick={() => {
                    deleteProduct(params.row.code);
                  }}
                  className="deleteBtn"
                >
                  {" "}
                </DeleteOutlineIcon>{" "}
              </div>{" "}
            </div>{" "}
          </>
        );
      },
    },
  ];

  return (
    <div className="products-container">
      <div className="products-table">
        {" "}
        {isLoading ? (
          <div className="spinner-container">
            <Spinner> </Spinner>{" "}
          </div>
        ) : error && showError ? (
          <ErrorModal
            onClose={handleCloseError}
            message="check your network access please"
          >
            {" "}
          </ErrorModal>
        ) : (
          <DataGrid
            className="data-grid"
            rows={products}
            columns={columns}
            getRowId={(row) => row.code}
          />
        )}{" "}
      </div>{" "}
      <Link to={`/${LogedInUsername}/Addproducts`}>
        <button className="productAddButton"> Add Product </button>{" "}
      </Link>{" "}
    </div>
  );
}
