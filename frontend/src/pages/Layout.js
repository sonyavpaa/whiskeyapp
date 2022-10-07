import React from "react";
import { Outlet } from "react-router-dom";
import NavbarCustom from "../components/NavbarCustom";

const LayOut = (props) => {
  return (
    <React.Fragment>
      <NavbarCustom user={props.user} userActive={props.userActive} />
      <div>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default LayOut;
