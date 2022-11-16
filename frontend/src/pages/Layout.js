import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

const LayOut = (props) => {
  return (
    <React.Fragment>
      <NavbarComponent />
      <div>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default LayOut;
