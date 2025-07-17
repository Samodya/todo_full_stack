import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";
import AllRoutes from "./Routes";
import { TasksContextProvider } from "./Context/tasksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <AllRoutes />
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
