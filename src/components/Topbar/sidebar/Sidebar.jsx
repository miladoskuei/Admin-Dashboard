import React from "react";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthContext from "../../../contexts/Islogin";
import { useContext } from "react";
import "./sidebar.css";

export default function Sidebar() {
  const {LogedInUsername} = useContext(AuthContext);
  const location = useLocation();
  const { username } = useParams();
  const params = useParams();
  console.log("username :", username);
  console.log("params :", params);

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
          <h3 className="title"> Dashboard </h3>{" "}
          <ul className="sidebar-list">
            <Link className="link" to={`/${LogedInUsername}/home`}>
              <li
                className={
                  location.pathname === `/${LogedInUsername}/home`
                    ? "sidebar-icon active"
                    : "sidebar-icon"
                }
              >
                <LineStyleIcon className="icon" />
                Home{" "}
              </li>{" "}
            </Link>{" "}
            <Link className="link" to={`/${LogedInUsername}/users`}>
              <li
                className={
                  location.pathname === `/${LogedInUsername}/users`
                    ? "sidebar-icon active"
                    : "sidebar-icon"
                }
              >
                <LineStyleIcon className="icon" />
                Users{" "}
              </li>{" "}
            </Link>{" "}
            <Link className="link" to={`/${LogedInUsername}/products`}>
              <li
                className={
                  location.pathname === `/${LogedInUsername}/products`
                    ? "sidebar-icon active"
                    : "sidebar-icon"
                }
              >
                <LineStyleIcon className="icon" />
                Products{" "}
              </li>{" "}
            </Link>{" "}
            <Link className="link" to={`/${LogedInUsername}/transactions`}>
              <li
                className={
                  location.pathname === `/${LogedInUsername}/transactions`
                    ? "sidebar-icon active"
                    : "sidebar-icon"
                }
              >
                <LineStyleIcon className="icon" />
                Transactions{" "}
              </li>{" "}
            </Link>{" "}
            <Link className="link" to={`/${LogedInUsername}/admins`}>
              <li
                className={
                  location.pathname === `/${LogedInUsername}/admins`
                    ? "sidebar-icon active"
                    : "sidebar-icon"
                }
              >
                <LineStyleIcon className="icon" />
                Admins{" "}
              </li>{" "}
            </Link>{" "}
            <Link className="link" to={`/${LogedInUsername}/faq`}>
              <li
                className={
                  location.pathname === `/${LogedInUsername}/faq`
                    ? "sidebar-icon active"
                    : "sidebar-icon"
                }
              >
                <LineStyleIcon className="icon" />
                FAQ{" "}
              </li>{" "}
            </Link>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
