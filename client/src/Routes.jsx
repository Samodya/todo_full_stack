import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./Hooks/useAuthContext";
import { Home, LandingPage } from "./pages/landingpage";
import App from "./App";// Import the AuthRoute component
import { Login } from "./components/login_page";
import { AuthRoute } from "./protectedRoutes";
import { Signup } from "./components/signup_page";

const RequireAuth = ({ children }) => {
    const { user } = useAuthContext();
    const location = useLocation();
  
    return user ? children : <Navigate to="/" state={{ from: location }} replace />;
  };

  const AllRoutes = () => {
    const { user } = useAuthContext();
  
    return (
        <Router>
        <Routes>
          {/* Unprotected Routes */}
          <Route
            path="/"
            element={user ? <Navigate to="/todo" /> : <Login />}
          />
          <Route
            path="/signup"
            element={<Signup/>}
          />

          {/* Protected Routes */}
          <Route path="/" element={<App/>}>
          <Route path="todo/*" element={<AuthRoute element={<LandingPage />} />} />
          </Route>
        </Routes>
      </Router>
    );
  };
  
  export default AllRoutes;