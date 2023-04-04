import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <h1>Login</h1>
        <form className="login-form">
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          {err && err}

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <div className="join-us">
            Not one of us yet? <Link to="/register">Join us</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
