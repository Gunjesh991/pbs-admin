import React from "react";
import { Outlet } from "react-router-dom";

const AdminPortfolioView = () => {
  return (
    <div className="safe">
      <Outlet />
    </div>
  );
};

export default AdminPortfolioView;
