import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs);

    setCurrentUser({
      ...res.data,
      accessToken: res.data.accessToken, // Store the accessToken in currentUser
    });

    // Store the user data (without the accessToken) in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(res.data));
  };

  const logout = () => {
  setCurrentUser(null);
};

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
