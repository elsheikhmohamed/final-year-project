import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserDataContextProvider } from "./context/userDataContext";

// Create a new query client
const queryClient = new QueryClient();

// Get the root element from the HTML
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component with the required context providers
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <UserDataContextProvider>
          <App />
        </UserDataContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
