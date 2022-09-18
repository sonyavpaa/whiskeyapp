import React from "react";
import { Outlet } from "react-router-dom";
import NavbarCustom from "../components/NavbarCustom";

const LayOut = () => {
  return (
    <React.Fragment>
      <NavbarCustom />
      <div>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default LayOut;
