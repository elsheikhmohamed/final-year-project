import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";


const Login = () => {
  // Declare state for form inputs and errors
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });

  // Hooks for navigation and authentication
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Handle input changes and reset error messages
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs before making the API call
    if (!inputs.username.trim() || !inputs.password.trim()) {
      setErrors({
        username: !inputs.username.trim() ? "Username is required" : null,
        password: !inputs.password.trim() ? "Password is required" : null,
      });
      return;
    }

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      // Handle error responses from the API
      if (err.response) {
        // Check if the status code is 404, and display a generic message
        if (err.response.status === 404) {
          setErrors({
            username: "Invalid username or password",
            password: "Invalid username or password",
          });
        } else {
          const errorMessage = err.response.data;
          if (errorMessage === "Invalid username") {
            setErrors((prev) => ({ ...prev, username: errorMessage }));
          } else if (errorMessage === "Invalid password") {
            setErrors((prev) => ({ ...prev, password: errorMessage }));
          }
        }
      } else if (err.request) {
        // The request was made, but no response was received
        console.error("Error: No response from server:", err.request);
        setErrors({
          username: "An error occurred. Please try again.",
          password: "An error occurred. Please try again.",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", err.message);
        setErrors({
          username: "An error occurred. Please try again.",
          password: "An error occurred. Please try again.",
        });
      }
    }
  };

  // Function to apply styles to input fields based on error state
  const inputStyle = (error) => (error ? { borderColor: "red" } : {});

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
            style={inputStyle(errors.username)}
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            style={inputStyle(errors.password)}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

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
