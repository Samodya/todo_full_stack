import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";
import AllRoutes from "./Routes";
import { TasksContextProvider } from "./Context/tasksContext";
import { UsersContextProvider } from "./Context/usersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
      <UsersContextProvider>
        <AllRoutes />
      </UsersContextProvider>
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
