import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayOut from "./pages/Layout";
import MenuMain from "./components/MenuMain";
import AddWhiskey from "./components/AddWhiskey";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<MenuMain />}></Route>
          <Route path="addwhiskey" element={<AddWhiskey />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
