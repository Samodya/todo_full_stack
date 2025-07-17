import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";
import { Link } from "react-router-dom";

export const Login = () => {
    const {login, isLoading, error} = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email,password)
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white text-black p-8 rounded-2xl shadow-lg flex flex-col items-center">
        {/* Company Logo / Title */}
        <div className="flex items-center mb-6">
          <span className="text-3xl font-extrabold text-blue-600">
            Todo App
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please login to your account
        </p>

        <div className="w-full space-y-4">
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail size={20} className="text-gray-500 mr-2" />
            <input
              className="bg-transparent outline-none w-full text-sm"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Lock size={20} className="text-gray-500 mr-2" />
            <input
              className="bg-transparent outline-none w-full text-sm"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button 
            className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold w-full py-2 rounded-lg"
            onClick={handleSubmit}
        >
          Login
        </button>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
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
