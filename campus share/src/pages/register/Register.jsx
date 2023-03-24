import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="reg-card">
        <h1>Register</h1>
        <form className="reg-form">
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="text" placeholder="Name" />
          <button className="reg-btn">Register</button>
          <label className="join-us">
            Already have an account? <Link to="/login">Login</Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Register;
