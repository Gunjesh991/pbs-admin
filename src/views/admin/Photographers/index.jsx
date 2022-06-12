import React from "react";
import { Outlet } from "react-router-dom";
import "./styles.css";

const Photographers = () => {
  return (
    <div className="safe">
      <Outlet />
    </div>
  );
};

export default Photographers;
