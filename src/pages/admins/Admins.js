import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/Islogin";
import { useContext } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

export default function Admins() {
  const { LogedInUsername } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const adminsRef = ref(database, "admins");
    onValue(adminsRef, (snapshot) => {
      const data = snapshot.val();
      const adminsList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setAdmins(adminsList);
    });
  }, []);

  return (
    <div className="container">
      <h1> Admins </h1>{" "}
      <Link to={`/${LogedInUsername}/addadmin`}>
        <Button variant="contained" color="primary">
          Add Admin{" "}
        </Button>{" "}
      </Link>{" "}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Username </TableCell>{" "}
              <TableCell> firstName </TableCell>{" "}
              <TableCell> Emagitil </TableCell>{" "}
            </TableRow>{" "}
          </TableHead>{" "}
          <TableBody>
            {" "}
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell> {admin.id} </TableCell>{" "}
                <TableCell> {admin.firstName} </TableCell>{" "}
                <TableCell> {admin.email} </TableCell>{" "}
              </TableRow>
            ))}{" "}
          </TableBody>{" "}
        </Table>{" "}
      </TableContainer>{" "}
    </div>
  );
}
