import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import "./products.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ourProducts } from "../../datas/routes/ourUsers";
import { clear } from "@testing-library/user-event/dist/clear";

import { fetchDatas } from "../../helpers/fetch";
import { useQuery } from "react-query";
import { useContext } from "react";
import ProductsContext from "../../contexts/ProductsContext";
// import "DeleteOutlineIcon" from "@mui/icons-material/DeleteOutline";

export default function Products() {
  const [products, setproducts] = useState([]);
  
  const productsContext = useContext(ProductsContext);


useEffect(() => {
setproducts(productsContext);
}, [productsContext]);


  function deleteProdcuts(id) {
    console.log(id);
    const updatedProducts = products.filter((product) => product.id !== id);
    setproducts(updatedProducts);
  }

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
      // renderCell: (params) => {
      //   console.log("params :", params);
      //   return (
      //     <>
      //       <div className="userRowContainer">
      //         <img
      //           className="userImg"
      //           src={`${process.env.PUBLIC_URL}/${params.row.img}`}
      //           alt=""
      //         />{" "}
      //         {params.row.title}{" "}
      //       </div>{" "}
      //     </>
      //   );
      // },
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
    // {
    //   field: "status",
    //   headerName: "status",
    //   width: 200,
    // },
    // {
    //   field: "transaction",
    //   headerName: "transaction",
    //   width: 200,
    // },
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
                    deleteProdcuts(params.row.code);
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
    <div className="userTable">
      <DataGrid
        className="data-grid"
        rows={products}
        columns={columns}
        getRowId={(row) => row.code}
      />{" "}
      <Link to={"/Addproducts"}>
        <button className="productAddButton"> Add Product </button>{" "}
      </Link>{" "}
    </div>
  );
}
