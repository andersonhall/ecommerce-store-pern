import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router";

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
            console.log(data.message);
            setError(data.message);
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );

    // if (response.ok) {
    //   console.log("Login successful:", data);
    //   navigate("/store"); // Redirect to the store page
    // } else {
    //   console.error("Login failed:", data.message);
    // }
  };
  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default Login;
