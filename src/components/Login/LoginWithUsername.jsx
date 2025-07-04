import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import ToasterUi from "toaster-ui";

export default function LoginWithUsername() {
  const toaster = new ToasterUi();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();

        if (data.user) {
          setUser(data.user);
          toaster.addToast("Login successfull", "success");
          navigate("/Posts");
        } else {
          toaster.addToast("Username and password do not match", "error");
        }
      } else {
        toaster.addToast("Username and password do not match", "error");
      }
    } catch (error) {
      toaster.addToast(
        "Please contact administrator or try again later",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-400 text-center">
          Welcome Back!
        </h2>
        <p className="text-gray-400 text-center mt-2">Log in to continue</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#222] text-white border border-gray-700 focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#222] text-white border border-gray-700 focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-400 text-black font-semibold p-3 rounded-lg hover:bg-blue-500 transition-all"
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Redirect Link to Email & Password Login */}
        <p className="mt-4 text-center text-gray-400">
          Want to log in with email?{" "}
          <Link to="/login-email" className="text-blue-400 hover:underline">
            Click here
          </Link>
        </p>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
