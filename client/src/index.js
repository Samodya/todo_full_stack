import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";
import AllRoutes from "./Routes";
import { TasksContextProvider } from "./Context/tasksContext";
import { UsersContextProvider } from "./Context/usersContext";
import { RequestContextProvider } from "./Context/requestscontent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <UsersContextProvider>
          <RequestContextProvider> 
            <AllRoutes />
          </RequestContextProvider>
        </UsersContextProvider>
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
