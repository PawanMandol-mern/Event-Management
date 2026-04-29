    import React from "react";
    import { useAuth } from "../context/AuthContext";
    import { Link } from "react-router-dom";

    const Event = () => {
    const { event, loading,eventLoaded } = useAuth();

    // ✅ correct loading check
    if (loading || !eventLoaded) {
        return (
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
    );
}

    return (
        <div className="p-4">
        {event?.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {event.map((e) => (
                <div
                key={e._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                >
                {/* Image */}
                <div className="w-full h-48 overflow-hidden hover:scale-110 transition duration-300">
                    <img
                    src={e?.image?.url}
                    alt={e.title}
                    className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-2">
                    <h2 className="text-lg font-semibold text-center">
                    {e.title}
                    </h2>

                    <p className="text-sm text-gray-600 text-center line-clamp-2">
                    {e.description}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
                        ₹{e.price}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                        {e.category}
                    </span>
                    </div>
                </div>

                <Link
                    to={`/booking-events/${e._id}`}
                    className="bg-orange-500 text-white py-3 text-center font-bold hover:bg-amber-700 transition block"
                >
                    Book your Event
                </Link>
                </div>
            ))}
            </div>
        ) : (
            <p className="text-center text-gray-500 text-lg">
            No Events Found
            </p>
        )}
        </div>
    );
    };

    export default Event;