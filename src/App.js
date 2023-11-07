import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminHome } from './pages/Admin';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Login from './pages/AdminLogin';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/home'} element={< AdminHome />} />
          <Route path={'/add'} element={< AddProduct />} />
          <Route path={'/edit'} element={< EditProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
