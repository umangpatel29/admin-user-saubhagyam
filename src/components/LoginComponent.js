import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .get(`http://localhost:3001/data?username=${username}&password=${password}`)
      .then((response) => {
        if (response.data.length === 0) {
          setMessage("Invalid username or password.");
        } else {
          const user = response.data[0];
          if (user.role === "admin") {
            setMessage("Admin logged in.");
            navigate('/user');
          } else {
            setMessage("User logged in.");
            navigate('/categories');
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error occurred while logging in.");
      });
  };

  return (
    <div className="login-container mt-3">
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <div>
        <p>{message}</p>
      </div>
      </div>
  );
};

export default LoginComponent;
