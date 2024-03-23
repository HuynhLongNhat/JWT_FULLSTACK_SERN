import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
function Nav(props) {
  const [isShowHeader, setIsShowHeader] = useState(true);
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login") {
      setIsShowHeader(false);
    }
  }, []);
  return (
    <div>
      {isShowHeader === true && (
        <div className="topnav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </div>
  );
}

export default Nav;
