import { Link } from "react-router-dom";

    const Success = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-green-600">
            🎉 Payment Successful!
        </h1>

        <p className="mt-2 text-gray-600">
            Your event has been booked successfully.
        </p>

        <Link
            to="/booked-events"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
            Go to Booked event page
        </Link>
        </div>
    );
    };

    export default Success;