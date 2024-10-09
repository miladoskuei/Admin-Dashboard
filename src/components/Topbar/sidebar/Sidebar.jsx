import React from "react";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
        

          <h3 className="title"> dashboard </h3>{" "}
          <ul className="sidebar-list">
            <Link className="link" to={"/Home"}>
              <li className={location.pathname == '/' ? 'sidebar-icon active':'sidebar-icon'}>
                <LineStyleIcon className="icon"> </LineStyleIcon>
                Home{" "}
              </li>{" "}
            </Link>
            <Link className="link" to={"/users"}>
              <li className={location.pathname == '/users' ? 'sidebar-icon active':'sidebar-icon'}>
                <LineStyleIcon className="icon"> </LineStyleIcon>
                users{" "}
              </li>{" "}
            </Link>{" "}
            <Link className="link" to={"/products"}>
              <li className={location.pathname == '/dashboard' ? 'sidebar-icon active':'sidebar-icon'}>
                <LineStyleIcon className="icon"> </LineStyleIcon>
                products{" "}
              </li>{" "}
            </Link>{" "}
            <Link className="link" to={"/transactions"}>
              <li className={location.pathname == '/dashboard' ? 'sidebar-icon active':'sidebar-icon'}>
                <LineStyleIcon className="icon"> </LineStyleIcon>
                Transactions
              </li>{" "}
            </Link>
            <Link className="link" to={"/admins"}>
              <li className={location.pathname == '/admins' ? 'sidebar-icon active':'sidebar-icon'}>
                <LineStyleIcon className="icon"> </LineStyleIcon>
                Admin{" "}
              </li>{" "}
            </Link>
            <Link className="link" to={"/FAQ"}>
              <li className={location.pathname == '/dashboard' ? 'sidebar-icon active':'sidebar-icon'}>
                <LineStyleIcon className="icon"> </LineStyleIcon>
                FAQ
              </li>{" "}
            </Link>
          </ul>{" "}
        </div>{" "}
       
      </div>{" "}
    </div>
  );
}
