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
    <div className="register">
      <div className="reg-card">
        <h1>Login</h1>
        <form className="reg-form">
          <input type="text" id="username" placeholder="Username" />
          <input type="password" id="password" placeholder="Password" />
          <button className="reg-btn" onClick={handleLogin}>
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
