import "bootstrap/dist/css/bootstrap.min.css";
import "./style/root.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import LayOut from "./pages/Layout";
import WhiskiesList from "./components/WhiskiesList";
import AddWhiskey from "./components/AddWhiskey";
import Login from "./components/Login";
import Distilleries from "./components/Distilleries";

function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);

    console.log("logged in user", user);
  }

  async function logout() {
    setUser(null);
    console.log("logout user ", user);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LayOut user={user} userActive={(e) => logout()} />}
        >
          <Route index element={<WhiskiesList />}></Route>
          <Route path="addwhiskey" element={<AddWhiskey />}></Route>
          <Route
            path="login"
            element={<Login user={user} loginUser={(e) => login("Sonja")} />}
          ></Route>
          <Route path="distilleries" element={<Distilleries />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
