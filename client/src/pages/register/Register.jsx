import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    universityEmail: "",
  });
  const [error, setError] = useState(null);
    const [inputErrors, setInputErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setInputErrors({
      ...inputErrors,
      [event.target.name]: !event.target.validity.valid,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // check if email address belongs to a UK university
    const universityEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(ac\.uk)$/i;
    if (!universityEmailRegex.test(formData.universityEmail)) {
      setError("Please enter a valid UK university email address");
      return;
    }

    try {
      await axios.post("http://localhost:8800/api/auth/register", formData);
      setShowPopup(true);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/login");
  };

  const Popup = () => (
    <div className="popup">
      <div className="popup-inner">
        <h2>User created successfully!</h2>
        <p>Please log in to continue.</p>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );

  return (
    <div className="register">
      <div className="reg-card">
        <h1>Register</h1>
        <form className="reg-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className={inputErrors.name ? "error" : ""}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            className={inputErrors.username ? "error" : ""}
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="University Email"
            name="universityEmail"
            className={inputErrors.universityEmail ? "error" : ""}
            value={formData.universityEmail}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={inputErrors.password ? "error" : ""}
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p>{error}</p>}

          <button className="reg-btn" type="submit">
            Register
          </button>

          <div className="join-us">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
      {showPopup && <Popup />}
    </div>
  );
};

export default Register;
