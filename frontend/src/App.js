import "bootstrap/dist/css/bootstrap.min.css";
import "./style/root.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayOut from "./pages/Layout";
import WhiskiesList from "./components/WhiskiesList";
import AddWhiskey from "./components/AddWhiskey";
import Login from "./components/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<WhiskiesList />}></Route>
          <Route path="addwhiskey" element={<AddWhiskey />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
