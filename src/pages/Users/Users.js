import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { ourUser } from "../../datas/routes/ourUsers";
import { useState } from "react";
import { width } from "@mui/system";
import "./userlist.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import "DeleteOutlineIcon" from "@mui/icons-material/DeleteOutline";

export default function Users() {
  const [users, setUsers] = useState(ourUser);
  
  function deleteUser(id) {
    console.log(id)
    const updatedUsers = users.filter((user) => user.id!== id);
    setUsers(updatedUsers);
  }

  const columns = [
    {
      field: "id",
      headerName: "id",
      width: 200,
    },
    {
      field: "user",
      headerName: "user",
      width: 200,
      renderCell: (params) => {
        console.log('params is :::',params)
        return (
          <Link to="/" className="link">
            <div className="userRowContainer">
              <img className="userImg" src={`${process.env.PUBLIC_URL}/${params.row.avatar}`}  alt="" />{" "}
              {params.row.username}{" "}
            </div>{" "}
          </Link>
        );
      },
    },
    
    {
      field: "email",
      headerName: "email",
      width: 240,
    },
    {
      field: "status",
      headerName: "status",
      width: 200,
    },
    {
      field: "transaction",
      headerName: "transaction",
      width: 200,
    },
    {
      field: "action",
      headerName: "action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div className="btncontainer">
              <Link className="edit" to="/">
                <button className="btnEdit"> Edit </button>{" "}
              </Link>{" "}
              <div className="iconcontainer">
                <DeleteOutlineIcon onClick={() => {deleteUser(params.row.id)}} className="deleteBtn"> </DeleteOutlineIcon>{" "}
              </div>
            </div>{" "}
          </>
        );
      },
    },
  ];

  return (
    <div className="userTable">
      <DataGrid className="data-grid" rows={users} columns={columns} />{" "}
    </div>
  );
}
