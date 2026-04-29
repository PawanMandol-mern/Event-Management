    import React from "react";
    import { Link, Outlet } from "react-router-dom";

    const Dashboard = () => {
    const adminOperations = [
        { title: "Create Event", link: "create-event", color: "bg-blue-400" },
        { title: "Update Event", link: "update-event", color: "bg-yellow-400" },
        { title: "Delete Event", link: "delete-event", color: "bg-red-400" },
        { title: "Accept Event", link: "accept-event", color: "bg-green-400" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminOperations.map((op) => (
            <Link
                key={op.title}
                to={op.link}
                className={`${op.color} rounded-lg p-6 shadow-lg text-white font-bold text-center hover:scale-105 transform transition`}
            >
                {op.title}
            </Link>
            ))}
        </div>

        {/* Nested route will render below cards */}
        <div className="mt-6">
            <Outlet />
        </div>
        </div>
    );
    };

    export default Dashboard;