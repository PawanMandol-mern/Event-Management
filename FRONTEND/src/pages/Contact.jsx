    import React, { useState } from "react";
    import axios from "axios";
    import toast from "react-hot-toast";

    const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const res = await axios.post(
            "http://localhost:3000/api/contact/contact",
            { name, email, message }
        );

        toast.success(res.data.message || "Message sent!");
        setName("");
        setEmail("");
        setMessage("");
        } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
            
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-pink-500">
            Contact Us
            </h1>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            
            <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
            />

            <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
            />

            <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows="4"
                required
            ></textarea>

            <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
            >
                Send Message
            </button>

            </form>
        </div>
        </div>
    );
    };

    export default Contact;