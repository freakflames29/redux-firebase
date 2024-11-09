import { Link, Outlet } from "react-router-dom";
import React from "react";

function Nav() {
  return (
    <div>
      <Link to={"/"}>
        <h1>Nav</h1>
      </Link>
      <Link to={"/home"}>Home</Link> <br />
      <Link to={"/login"}>Login</Link> <br />
      <Link to={"/addinfo"}>Adinfo</Link> <br />
      <Link to={"/addtodo"}>Addtodo</Link>
      <br />
      <br />
      <Outlet />
    </div>
  );
}

export default Nav;
