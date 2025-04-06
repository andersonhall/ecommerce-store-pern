import "./Navbar.css";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
