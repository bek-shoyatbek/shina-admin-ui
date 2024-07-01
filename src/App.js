import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminHome } from "./pages/Admin";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Login from "./pages/AdminLogin";
import { LocationsHome } from "./components/LocationsHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/admin"} element={<Login />} />
          <Route path={"/home"} element={<AdminHome />} />
          <Route path={"/add"} element={<AddProduct />} />
          <Route path={"/edit"} element={<EditProduct />} />
          <Route path={"/places"} element={<LocationsHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
