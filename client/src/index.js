import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserDataContextProvider } from "./context/userDataContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DarkModeContextProvider>
        <AuthContextProvider>
          <UserDataContextProvider>
            <App />
          </UserDataContextProvider>
        </AuthContextProvider>
      </DarkModeContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
