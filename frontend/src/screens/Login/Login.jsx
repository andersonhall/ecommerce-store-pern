import "./Login.css";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/store");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <p className="login-form-title">
        <strong>Login</strong>
      </p>
      <span className="errorMessage">{error}</span>
      <label htmlFor="username">Username:</label>
      <input
        required
        type="text"
        id="username"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        required
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </form>
  );
};

export default Login;
