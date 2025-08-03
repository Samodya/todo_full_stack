import { Lock, User, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../utilities/httpservices";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [showconpassword, setShowConpassword] = useState(false);
  const navigate = useNavigate()

  const changeTexttype = () => {
    setShowpassword(!showpassword);
  };

  const changeConTexttype = () => {
    setShowConpassword(!showconpassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    // Email validation
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    return valid;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    const data = {
      fullname,
      username,
      email,
      password,
    };

    try {
      const results = await apiService.createData("users/register", data);
      if (results) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white text-black p-8 rounded-2xl shadow-lg flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center mb-6">
          <span className="text-3xl font-extrabold text-blue-600">
            Todo App
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 mb-6">Sign up to get started</p>

        <div className="w-full space-y-4">
          {/* Fullname */}
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <User size={20} className="text-gray-500 mr-2" />
            <input
              className="bg-transparent outline-none w-full text-sm"
              type="text"
              placeholder="Fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          {/* Username */}
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <User size={20} className="text-gray-500 mr-2" />
            <input
              className="bg-transparent outline-none w-full text-sm"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail size={20} className="text-gray-500 mr-2" />
            <input
              className="bg-transparent outline-none w-full text-sm"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail();
              }}
            />
          </div>
              {emailError && <div className="text-sm text-red 500 my-1"> {emailError} </div>}
          {/* Password */}
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Lock size={20} className="text-gray-500 mr-2" />
            <input
              className="bg-transparent outline-none w-full text-sm"
              type={showpassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <div onClick={changeTexttype} className="flex items-center">
              {showpassword ? (
                <EyeOff size={20} className="text-gray-500 mr-2" />
              ) : (
                <Eye size={20} className="text-gray-500 mr-2" />
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Lock size={20} className="text-gray-500 mr-2" />
            <input
              className="bg-transparent outline-none w-full text-sm"
              type={showconpassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div onClick={changeConTexttype} className="flex items-center">
              {showconpassword ? (
                <EyeOff size={20} className="text-gray-500 mr-2" />
              ) : (
                <Eye size={20} className="text-gray-500 mr-2" />
              )}
            </div>
          </div>
        </div>
          
          {confirmPasswordError && <div className="text-sm text-red 500 my-1"> {confirmPasswordError} </div>}
        {/* Sign Up Button */}
        <button 
          className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold w-full py-2 rounded-lg"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          © 2025 Todo App. All rights reserved.
        </p>
      </div>
    </div>
  );
};
