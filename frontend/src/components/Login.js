import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState();

  const login = (e) => {
    e.preventDefault();
    if (user === process.env.REACT_APP_USER) {
      localStorage.setItem("isLoggedIn", "true");
      console.log("login succesful");
    } else console.log("wrong username");
  };

  return (
    <div>
      <form onSubmit={(e) => login(e)}>
        <input
          name="user"
          id="user"
          onChange={(e) => setUser(e.currentTarget.value)}
          placeholder="Login user"
          input={user}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
