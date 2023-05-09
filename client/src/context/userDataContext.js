import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const UserDataContext = createContext();

// Custom hook to use UserDataContext
export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataContextProvider = ({ children }) => {
  // Declare state for user data
  const [userData, setUserData] = useState({});

  // Get the current user from AuthContext
  const { currentUser } = useContext(AuthContext);

  // Fetch user data using React Query, only when currentUser is available
  const { data } = useQuery(
    ["user"],
    async () => {
      if (currentUser && currentUser.id) {
        const response = await makeRequest.get("/users/find/" + currentUser.id);
        return response.data;
      }
      return null;
    },
    { enabled: !!currentUser }
  );

  // Update userData state whenever new data is fetched
  useEffect(() => {
    if (data) {
      setUserData((prevUserData) => {
        return { ...prevUserData, [data.id]: data };
      });
    }
  }, [data]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
