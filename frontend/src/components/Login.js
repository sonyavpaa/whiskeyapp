import React from "react";

const Login = (props) => {
  return (
    <div>
      <button onClick={props.loginUser}>Login here</button>
    </div>
  );
};

export default Login;
