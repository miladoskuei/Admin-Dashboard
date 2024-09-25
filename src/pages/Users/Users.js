import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { ourUser } from "../../datas/routes/ourUsers";
import { useState } from "react";
import { width } from "@mui/system";
import "./userlist.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import "DeleteOutlineIcon" from "@mui/icons-material/DeleteOutline";
import UsersContext from "../../contexts/UsersContexts";
import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { ref, remove } from "firebase/database";
import { database } from "../../firebaseConfig";
export default function Users() {
  const [users, setUsers] = useState([]);

  async function deleteUser(id) {
    try {
      await remove(ref(database, `users/${id}`));
      fetchUsersWithTimeout(); // بهروزرسانی لیست محصولات پس از حذف
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  const {
    users: usersContext,
    fetchUsers,
    isLoading,
    error,
    fetchUsersWithTimeout,
  } = useContext(UsersContext);

  useEffect(() => {
    setUsers(usersContext);
  }, [usersContext]);
  console.log("ssss", usersContext);

  const columns = [
    {
      field: "code",
      headerName: "id",
      width: 200,
    },
    {
      field: "name",
      headerName: "user",
      width: 200,
      renderCell: (params) => {
        console.log("params is :::", params);
        return (
          <Link to="/" className="link">
            <div className="userRowContainer">
              <img
                className="userImg"
                src={`${process.env.PUBLIC_URL}/${params.row.avatar}`}
                alt=""
              />{" "}
              {params.row.username}{" "}
            </div>{" "}
          </Link>
        );
      },
    },

    {
      field: "mail",
      headerName: "email",
      width: 240,
    },
    {
      field: "status",
      headerName: "status",
      width: 200,
    },
    {
      field: "transition",
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
              <Link className="edit" to={`/users/${params.row.code}`}>
                <button className="btnEdit"> Edit </button>{" "}
              </Link>{" "}
              <div className="iconcontainer">
                <DeleteOutlineIcon
                  onClick={() => {
                    deleteUser(params.row.code);
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
    <div className="users-container">
      {" "}
      {isLoading ? (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="usersTable-container">
          <div className="userTable">
            <DataGrid
              getRowId={(row) => row.code}
              className="data-grid"
              rows={users}
              columns={columns}
            />{" "}
          </div>{" "}
          <Link to={"/AddUser"}>
            <button className="productAddButton"> Add Product </button>{" "}
          </Link>{" "}
        </div>
      )}{" "}
    </div>
  );
}
