import { useState } from "react";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className="lPage">
      <h1 className="loginTitle">TRIPHOPPER ADMIN LOGIN</h1>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="lInput"
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="lInput"
        />

        <button className="lButton" disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
