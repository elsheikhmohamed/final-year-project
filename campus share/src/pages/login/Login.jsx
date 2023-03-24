import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="login">
      <div className="login-cad">
        <h1>Login</h1>
        <form className="login-form">
          <input type="text" id="username" placeholder="Username" />
          <input type="password" id="password" placeholder="Password" />
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <label className="join-us">
            Not one of us yet? <Link to="/register">Join us</Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Login;
