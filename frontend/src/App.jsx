import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
