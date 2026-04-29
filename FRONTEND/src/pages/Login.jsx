    import React, { useState } from "react";
    import axios from "axios";
    import toast from "react-hot-toast";
    import { useNavigate } from "react-router-dom";
    import { useAuth } from "../context/AuthContext";

    const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setIsAuthenticated, setUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post(
            "http://localhost:4000/api/users/login",
            { email, password },
            { withCredentials: true }
        );

        // ✅ set user & auth state immediately
        setUser(res.data.user);
        setIsAuthenticated(true);

        toast.success(res.data.message || "Login successfully");

        // ✅ redirect based on role
        if (res.data.user.role === "admin") {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
        } catch (error) {
        toast.error(error?.response?.data?.message || "Login failed");
        console.log("Login error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-500 text-center">
            User Login
            </h1>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="text-sm font-medium">
                Email
                </label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label htmlFor="password" className="text-sm font-medium">
                Password
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
                Login
            </button>
            </form>
        </div>
        </div>
    );
    };

    export default Login;