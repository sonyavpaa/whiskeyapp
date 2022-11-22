import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

const LayOut = (props) => {
  const user = props.user;
  console.log("user from layout:", user);

  return (
    <React.Fragment>
      {user ? <NavbarComponent /> : ""}

      <div>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default LayOut;
