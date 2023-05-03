import { useState } from "react";
import { Link } from "react-router-dom";
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
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
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="register">
      <div className="reg-card">
        <h1>Register</h1>
        <form className="reg-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="University Email"
            name="universityEmail"
            value={formData.universityEmail}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
    </div>
  );
};

export default Register;
