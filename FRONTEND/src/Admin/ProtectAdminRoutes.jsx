    import React from "react";
    import { useAuth } from "../context/AuthContext";
    import { Navigate } from "react-router-dom";

    const ProtectAdminRoutes = ({ children, adminOnly = false }) => {
    const { isAuthenticated, loading, user } = useAuth();
    console.log("ProtectRoute", user, isAuthenticated, loading);

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/login" />;

    if (adminOnly && user?.role !== "admin") return <Navigate to="/" />;

    return children;
    };

    export default ProtectAdminRoutes;