    import React from 'react'
    import pkkk from "../assets/eventOwner.png"

    const Hero = () => {
    return (
        <section className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8">
            
            {/* Text Section */}
            <div className="md:w-1/2 text-center md:text-left">
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">
                Creating Unforgettable Events
            </h1>

            <p className="mt-4 text-gray-600 text-base sm:text-lg">
                Pawan Event Management is your trusted partner for planning and 
                executing successful events. We specialize in weddings, corporate 
                functions, and private celebrations with attention to every detail.
            </p>

            <button className="mt-6 bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-lg transition">
                Book Your Event
            </button>

            </div>

            {/* Image Section */}
            <div className="md:w-1/2">
            <img
                src={pkkk}
                alt="event"
                className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
            </div>

        </div>
        </section>
    )
    }

    export default Hero