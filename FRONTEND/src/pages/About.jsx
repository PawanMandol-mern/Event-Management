    import React from "react";

    const About = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10">
            
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-pink-500 mb-6">
            About Our Wedding Event Management
            </h1>

            {/* Intro */}
            <p className="text-gray-600 text-center mb-6">
            We specialize in creating unforgettable wedding experiences. From
            planning to execution, we handle everything with perfection and love.
            </p>

            {/* Services */}
            <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-pink-100 p-4 rounded-xl">
                <h2 className="font-bold text-lg text-pink-600">Wedding Planning</h2>
                <p className="text-gray-600 text-sm mt-2">
                Complete planning from venue selection to final ceremony.
                </p>
            </div>

            <div className="bg-pink-100 p-4 rounded-xl">
                <h2 className="font-bold text-lg text-pink-600">Decoration</h2>
                <p className="text-gray-600 text-sm mt-2">
                Beautiful and customized decorations for your special day.
                </p>
            </div>

            <div className="bg-pink-100 p-4 rounded-xl">
                <h2 className="font-bold text-lg text-pink-600">Catering</h2>
                <p className="text-gray-600 text-sm mt-2">
                Delicious food menus for all types of guests.
                </p>
            </div>

            <div className="bg-pink-100 p-4 rounded-xl">
                <h2 className="font-bold text-lg text-pink-600">Photography</h2>
                <p className="text-gray-600 text-sm mt-2">
                Capture every beautiful moment of your wedding.
                </p>
            </div>
            </div>

            {/* Why Choose Us */}
            <div className="mt-10">
            <h2 className="text-2xl font-bold text-center text-pink-500 mb-4">
                Why Choose Us?
            </h2>

            <ul className="text-gray-600 space-y-2 text-center">
                <li>✔ Experienced Team</li>
                <li>✔ Affordable Packages</li>
                <li>✔ Custom Wedding Themes</li>
                <li>✔ 100% Customer Satisfaction</li>
            </ul>
            </div>

            {/* Contact */}
            <div className="mt-10 text-center">
            <h2 className="text-xl font-bold text-pink-500">Contact Us</h2>
            <p className="text-gray-600 mt-2">📍 Location: India</p>
            <p className="text-gray-600">📞 Phone: +91 XXXXXXXX</p>
            <p className="text-gray-600">📧 Email: support@eventora.com</p>
            </div>

        </div>
        </div>
    );
    };

    export default About;