    import React, { useState } from "react";
    import axios from "axios";
    import toast from "react-hot-toast";
    import {useNavigate} from "react-router-dom"
    const Register = () => {
        const [fullName, setFullName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [role, setRole] = useState("user"); 

        const navigate = useNavigate()

        const handleSubmit = async (e) => {
            e.preventDefault();
            
        try {
        const res = await axios.post(
            "http://localhost:4000/api/users/register",
            { fullName, email, password, role }, 
            {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
            }
        );

        toast.success(res.data.message || "Registered successfully");
        navigate("/login")
        console.log(res.data);
        } catch (error) {
        toast.error(error.response?.data?.message || "Error occurred");
        console.log("Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-500 text-center">
            User Sign-Up
            </h1>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
                <label htmlFor="name" className="text-sm font-medium">
                Full Name
                </label>
                <input
                type="text"
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Role Selection */}
            <div className="flex justify-between mt-4">
                <button
                type="button"
                onClick={() => setRole("user")}
                className={`w-1/2 py-2 rounded-l-lg border ${
                    role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                >
                User
                </button>
                <button
                type="button"
                onClick={() => setRole("admin")}
                className={`w-1/2 py-2 rounded-r-lg border ${
                    role === "admin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                >
                Admin
                </button>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg transition duration-200 mt-4"
            >
                Sign Up
            </button>
            </form>
        </div>
        </div>
    );
    };

    export default Register;