import React from "react";
import { Link } from "react-router-dom";

export default function Admins() {
  return (
    <div>
      Admins{" "}
      <Link to={"/addadmin"}>
        <button className="productAddButton"> Add Admin </button>{" "}
      </Link>{" "}
    </div>
  );
}
