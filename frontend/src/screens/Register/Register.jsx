import { useState } from "react";
import { useNavigate, Link } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUrl = "http://localhost:3000/register";
    await fetch(loginUrl, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        first_name: firstName,
        last_name: lastName,
        password: password,
      }),
    }).then(
      (res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data.message);
            console.log(data.user);
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
        <strong>Register</strong>
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
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        required
        id="firstName"
        name="firstName"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        required
        id="lastName"
        name="lastName"
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        required
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="password2">Confirm Password:</label>
      <input
        required
        type="password"
        id="password2"
        name="password2"
        onChange={(e) => setPassword2(e.target.value)}
      />
      <input type="submit" />
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
};

export default Register;
