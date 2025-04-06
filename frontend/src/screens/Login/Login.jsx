import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUrl = "http://localhost:3000/login";
    await fetch(loginUrl, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(
      (res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data.message);
            navigate("/store");
          });
        } else {
          res.json().then((data) => {
            console.error(data.message);
            setError(data.message);
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
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
