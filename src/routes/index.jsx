import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminRoute from "../views/admin";
import Photographers from "../views/admin/Photographers";
import PhotographerList from "../views/admin/Photographers/list";
import Register from "../views/admin/Photographers/register";
import EditPhotographer from "../views/admin/Photographers/edit";
import AdminPortfolioView from "../views/admin/Portfolio";
import PersonView from "../views/admin/Portfolio/PersonView";
import AdminLogin from "../views/admin/Auth/login";
import RequestsView from "../views/admin/Requests";
import RequestsListView from "../views/admin/Requests/list";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* admin */}
        <Route index element={<AdminLogin />} />
        <Route path="admin" element={<AdminRoute />}>
          <Route path="photographers" element={<Photographers />}>
            <Route index element={<PhotographerList />} />
            <Route path="edit/:id" element={<EditPhotographer />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="portfolio" element={<AdminPortfolioView />}>
            <Route path=":pid" element={<PersonView />} />
          </Route>
          <Route path="requests" element={<RequestsView />}>
            <Route index element={<RequestsListView />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
