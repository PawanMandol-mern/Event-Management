    import React, { useEffect, useState } from "react";
    import axios from "axios";

    const BookedEvents = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
        try {
            const { data } = await axios.get(
            "http://localhost:4000/api/booking/my-bookings",
            { withCredentials: true }
            );

            setBookings(data.bookings);
            console.log('booked data :',data.bookings)
        } catch (error) {
            console.log(error);
        }
        };

        fetchBookings();
    }, []);

    return (
        <div className="p-4">
        <h1 className="text-4xl font-bold mb-4 text-center text-purple-800 hover:text-purple-400">My Bookings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {bookings.length > 0 ? (
            bookings.map((b) => (
            <div key={b._id} className="bg-white shadow p-4 rounded mb-4">
                
                <h2 className="text-lg font-bold">
                {b.eventId?.title}
                </h2>

                <img
                src={b.eventId?.image?.url}
                alt=""
                className="w-full h-40 object-cover rounded mt-2 hover:scale-110 transition duration-300"
                />

                <p>Date: {b.eventDate}</p>
                <p>Guests: {b.guests}</p>
                <p>Address: {b.Address}</p>

            </div>
            ))
        ) : (
            <p>No bookings found</p>
        )}
        </div>
        </div>
    );
    };

    export default BookedEvents;