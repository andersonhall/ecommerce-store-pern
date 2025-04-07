import "./App.css";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import Store from "./screens/Store/Store";
import { AuthContext } from "./context/authContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  const PrivateRoutes = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/store" element={<Store />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
