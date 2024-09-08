import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import "./topbar.css";
import { useMediaQuery } from "react-responsive";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationMenu from "./Notfications/Notfications";
import SettingsMenu from "./settings/Setting";

export default function Topbar({setHamburgerSidebar}) {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <div className="topbar">
      <div className="topbar-container">
        <div className="leftTopbar">
          {!isDesktop && <MenuIcon onClick = {()=>setHamburgerSidebar()}></MenuIcon>}
          <span className="logo">sabzlearn</span>
        </div>

        <div className="rightTopbar">
          <div className="rightIconContainer">
            <NotificationMenu></NotificationMenu>


          </div>
          <div className="rightIconContainer">
            <SettingsMenu></SettingsMenu>
          </div>

        </div>
      </div>
    </div>
  );
}
