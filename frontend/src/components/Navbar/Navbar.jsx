import "./Navbar.css";
import { Link } from "react-router";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import CartCounter from "../CartCounter/CartCounter";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <CartCounter />
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
