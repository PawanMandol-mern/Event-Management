    import React from "react";
    import pawannn from "../assets/pawann11.png";
    import { Link } from "react-router-dom";
    import { useAuth } from "../context/AuthContext";

    const Navigation = () => {
    const { isAuthenticated, logout ,user} = useAuth();
        console.log("Navbar auth:", isAuthenticated, user)
    return (
        <div className="flex items-center justify-between shadow bg-gray-800 px-4">
        <div className="flex justify-between">
            <img
            src={pawannn}
            alt=""
            className="w-20 h-20  rounded-md object-cover"
            />
            {/* <h1 className='text-2xl font-bold text-blue-700'>Event Managemet</h1> */}
        </div>
        <div className="flex gap-4 text-xl">
            <Link to="/" className="hover:underline duration-300 text-white ">
            Home
            </Link>
            <Link to="/events" className="hover:underline duration-300  text-white">
            Wedding-Events
            </Link>
            {
                user?.role === "user" && (
                    <Link to="/booked-events" className="hover:underline duration-300  text-white">
                    Booked events
                    </Link>
                )
            }
            <Link to="/about"
            className="hover:underline duration-300  text-white">About</Link>
            <Link to="contact"
            className="hover:underline duration-300  text-white">
            Contact-Us{" "}
            </Link>
        </div>
        <div className="flex gap-2">
            {!isAuthenticated ? (
            <>
                <Link
                to="/register"
                className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
                >
                SignUp
                </Link>

                <Link
                to="/login"
                className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
                >
                Login
                </Link>
            </>
            ) : (
                <>
                    {
                        user?.role === "admin" && (
                            <Link to="/dashboard" 
                            className=" bg-pink-600 hover:bg-pink-400 text-white font-semibold px-4 py-2 rounded-lg transition duration-200">
                            DashBoard
                        </Link>
                        )}
            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
                >
                Logout
            </button>
                </>
            )}
        </div>
        </div>
    );
    };

    export default Navigation;
