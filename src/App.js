import "./App.css";
import myroutes from "./datas/routes/routes";
import { useRoutes } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Topbar/sidebar/Sidebar";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  let router = useRoutes(myroutes);
  console.log(myroutes);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const [hamburgerSidebar, setHamburgerSidebar] = useState(false);

  console.log(hamburgerSidebar);

  function HamburgerSidebar() {
    setHamburgerSidebar(!hamburgerSidebar);
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <Topbar setHamburgerSidebar={HamburgerSidebar}> </Topbar>{" "}
      <div className="app-container">
        {" "}
        {isDesktop && !hamburgerSidebar && <Sidebar> </Sidebar>}{" "}
        <CSSTransition
          in={hamburgerSidebar}
          timeout={900}
          classNames="sidebar"
          unmountOnExit
        >
          <Sidebar />
        </CSSTransition>{" "}
        {router}{" "}
      </div>{" "}
    </div>
  );
}

export default App;
