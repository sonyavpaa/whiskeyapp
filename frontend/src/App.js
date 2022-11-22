import "bootstrap/dist/css/bootstrap.min.css";
import "./style/root.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayOut from "./pages/Layout";
import WhiskiesList from "./components/WhiskiesList";
import AddWhiskey from "./components/AddWhiskey";
import Login from "./components/Login";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(false);

  const checkUser = () => {
    if (localStorage.getItem("isLoggedIn")) {
      setUser(true);
    } else setUser(false);
  };

  useEffect(() => {
    checkUser();
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut user={user} />}>
          <Route index element={<WhiskiesList user={user} />}></Route>
          {["addwhiskey", "editwhiskey/*"].map((path, i) => (
            <Route
              key={i}
              path={path}
              element={<AddWhiskey user={user} />}
            ></Route>
          ))}
          <Route path="login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
