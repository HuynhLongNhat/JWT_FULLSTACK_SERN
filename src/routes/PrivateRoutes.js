import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
function PrivateRoutes(props) {
  let navigate = useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
      window.location.reload();
    }
    if (session) {
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}

export default PrivateRoutes;
