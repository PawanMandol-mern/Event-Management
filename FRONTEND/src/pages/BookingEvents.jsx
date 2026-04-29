    import React, { useState } from "react";
    import axios from 'axios'
    import toast from "react-hot-toast";
    // import { useAuth } from "../context/AuthContext";
    import { useParams } from "react-router-dom";


    const BookingEvents = () => {
        const [clientName, setClientName] = useState("")
        const [Address, setAddress] = useState("")
        const [contactNumber, setContactNumber] = useState("")
        const [eventDate, setEventDate] = useState("")
        const [guest, setGuest] = useState("")

        const {id} =useParams()

        const handleSubmit = async (e) =>{
            e.preventDefault()

            try {
                const res = await axios.post(`http://localhost:4000/api/booking/booking/${id}`,
                    {clientName,Address,contactNumber,guests:guest,eventDate},
                    {
                    withCredentials : true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                    })
                    toast.success(res.data.message || "booking successfully")
                console.log(res.data)

                window.location.href = res.data.url; //striper 

            } catch (error) {
                toast.error(error.response.data.message)
                console.log('object',error)

            }
        }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
            
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-500 text-center">
            Booking Events details
            </h1>

            <form  className="mt-6 space-y-4" onSubmit={handleSubmit}>
            
            <div>
                <label htmlFor="Client-Name" className="text-sm font-medium">
                Client-Name
                </label>
                <input
                type="text"
                id="Client-Name"
                value={clientName}
                onChange={(e) =>setClientName(e.target.value)}
                placeholder="Enter the client name"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label htmlFor="Address" className="text-sm font-medium">
                Address
                </label>
                <input
                type="text"
                id="Address"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter the Address"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label htmlFor=" Contact-Number" className="text-sm font-medium">
                Contact-Number
                </label>
                <input
                type="text"
                id=" Contact-Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter your contact number"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div>
                <label htmlFor="Event-Date" className="text-sm font-medium">
                Event-Date
                </label>
                <input
                type="date"
                id="Event-Date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div>
                <label htmlFor="Total-Guest" className="text-sm font-medium">
                Total-Guest
                </label>
                <input
                type="number"
                id="Total-Guest"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
                Payning Amount
            </button>

            </form>
        </div>
        </div>
    );
    };

    export default BookingEvents;