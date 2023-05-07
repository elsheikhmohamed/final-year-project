import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const UserDataContext = createContext();

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const { currentUser } = useContext(AuthContext);

  const { isLoading, data } = useQuery(
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
  

  useEffect(() => {
    if (!isLoading && data) {
      setUserData((prevUserData) => {
        return { ...prevUserData, [data.id]: data };
      });
    }
  }, [isLoading, data]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
