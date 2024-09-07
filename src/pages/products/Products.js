import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { ourUser } from "../../datas/routes/ourUsers";
import { useState } from "react";
import { width } from "@mui/system";
import "./products.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ourProducts } from "../../datas/routes/ourUsers";
import { clear } from "@testing-library/user-event/dist/clear";

// import "DeleteOutlineIcon" from "@mui/icons-material/DeleteOutline";

export default function Products() {
  const [products, setproducts] = useState(ourProducts);

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
      field: "id",
      headerName: "id",
      width: 200,
    },
    {
      editable: true,
      field: "title",
      headerName: "title",
      width: 200,
      renderCell: (params) => {
        console.log("params :", params);
        return (
          <>
            <div className="userRowContainer">
              <img className="userImg" src={params.row.img} alt="" />{" "}
              {params.row.title}{" "}
            </div>{" "}
          </>
        );
      },
    },
    {
      field: "cost",
      headerName: "price",
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
              <Link className="edit" to={`/products/${params.row.id}`}>
                <button className="btnEdit"> Edit </button>{" "}
              </Link>{" "}
              <div className="iconcontainer">
                <DeleteOutlineIcon
                  onClick={() => {
                    deleteProdcuts(params.row.id);
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

    <div style={{backgroundColor:'#5ff'}} className="userTable">
      <DataGrid  className="data-grid" rows={products} columns={columns} />{" "}
    </div>
    
  );
}
