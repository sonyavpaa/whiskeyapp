import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

const Login = () => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (user === process.env.REACT_APP_USER) {
      localStorage.setItem("isLoggedIn", "true");
      console.log("login succesful");
    } else console.log("wrong username");
    document.getElementById("user").value = "";
    navigate("/");
    window.location.reload(false);
  };

  return (
    <section className="loginPageContainer">
      <form onSubmit={(e) => login(e)}>
        <input
          name="user"
          id="user"
          type="password"
          onChange={(e) => setUser(e.currentTarget.value)}
          placeholder="Enter username"
          input={user}
          autocomplete="off"
        />
        <button type="submit">Log in</button>
      </form>
    </section>
  );
};

export default Login;
