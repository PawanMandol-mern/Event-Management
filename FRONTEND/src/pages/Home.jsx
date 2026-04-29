    import React from "react";
    import Hero from "../Home/Hero";
    import { useAuth } from "../context/AuthContext";

    import { Swiper, SwiperSlide } from "swiper/react";
    import { Navigation, Pagination, Autoplay } from "swiper/modules"; // ✅ added Autoplay

    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    import { Link } from "react-router-dom";

    const Home = () => {
    const { event } = useAuth();

    return (
        <div>
        <Hero />

        <div className="p-4">
            {event?.length > 0 ? (
            <Swiper
                spaceBetween={20}
                // navigation
                speed={500}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }} // ✅ fixed
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Autoplay]} // ✅ added here
                breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
                }}
            >
                {event.map((e) => (
                <SwiperSlide key={e._id}>
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                    
                    {/* Image */}
                    <div className="w-full h-48 overflow-hidden">
                        <img
                        src={e?.image?.url}
                        alt={e.title}
                        className="w-full h-full object-cover hover:scale-110 transition duration-300"
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
                    <Link to={`/booking-events/${e._id}`}
                    className="bg-orange-500 text-white py-4 px-29 flex text-center w-full  font-bold hover:bg-amber-700 transition">Book your Event</Link>
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
            ) : (
            <p className="text-center text-gray-500 text-lg">
                No Events Found
            </p>
            )}
        </div>
        </div>
    );
    };

    export default Home;