import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
function AppRoutes(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/users" element={<Users />} />
        </Route>

        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/projects" element={<div>Project</div>} />
        </Route>
        <Route path="/about" element={<div>About</div>} />
        <Route path="*" element={<div> 404 Not Found</div>} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
