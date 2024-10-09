import React, { useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./topbar.css";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationMenu from "./Notfications/Notfications";
import SettingsMenu from "./settings/Setting";
import { IconButton, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Topbar({ setHamburgerSidebar }) {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className="topbar">
      <div className="topbar-container">
        <div className="leftTopbar">
          {" "}
          {!isDesktop && (
            <MenuIcon onClick={() => setHamburgerSidebar()} />
          )}{" "}
          <span className="logo"> sabzlearn </span>{" "}
        </div>{" "}
        <div className="rightTopbar">
          <div className="rightIconContainer">
            <NotificationMenu />
          </div>{" "}
          <div className="rightIconContainer">
            <SettingsMenu />
          </div>{" "}
          <div className="rightIconContainer">
            <IconButton onClick={handleToggle} color="inherit">
              {" "}
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}{" "}
            </IconButton>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
