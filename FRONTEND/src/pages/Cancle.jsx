    import React from "react";
    import { FaCheckCircle } from "react-icons/fa";

    const Cancle = () => {

    return (
        <div className="flex items-center justify-center h-screen bg-linear-to-r from-green-100 to-green-200">
        
        <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">
            
            {/* Icon */}
            <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-green-500 text-6xl" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-green-600 mb-2">
            Payment Cancelled ❌
            </h1>

            {/* Message */}
            <p className="text-gray-600 mb-6">
            Your payment was not completed or was cancelled.  
            You can try again or explore other courses.
            </p>
        </div>
        </div>
    );
    };

    export default Cancle;