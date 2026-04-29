    import BookingModel from "../Model/BookingModel.js";
    import EventModel from "../Model/EventModel.js";
    import Stripe from "stripe";

    // console.log('stripe:',stripe)
    
    export const booking = async (req, res) => {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const userId = req.userId;
            const eventId = req.params.id;
            
            const { clientName, Address, contactNumber, eventDate, guests } = req.body;
            
            // Check event
            const event = await EventModel.findById(eventId);
            if (!event) {
                return res.status(400).json({
                    message: "Event not found",
                    success: false,
                });
            }
            
            //  Validation
            if (!clientName || !eventDate || !guests || !Address || !contactNumber) {
        return res.status(400).json({
            message: "All fields are required",
            success: false,
        });
        }

        if (guests <= 0) {
        return res.status(400).json({
            message: "Guests must be at least 1",
            success: false,
        });
        }

        //  Duplicate booking check
        const existsBooking = await BookingModel.findOne({
        userId,
        eventId,
        eventDate,
        });

        if (existsBooking) {
        return res.status(400).json({
            message: "You already booked this event for this date",
            success: false,
        });
        }

        //  Create booking
        const booking = await BookingModel.create({
        userId,
        eventId,
        eventDate,
        clientName,
        Address,
        contactNumber,
        guests, 
        status : 'Pending'
        });

        //  Stripe session
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
            price_data: {
                currency: "inr", 
                product_data: {
                name: event.title,
                images: [event.image?.url],
                },
                unit_amount: event.price * 100, 
            },
            quantity: guests, // ✅ use guests
            },
        ],
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
        });

        return res.status(201).json({
        message: "Booking created, redirecting to payment",
        success: true,
        url: session.url, 
        booking,
        });

    } catch (error) {
        if (error.code === 11000) {
        return res.status(400).json({
            message: "Duplicate booking",
            success: false,
        });
        }

        return res.status(500).json({
        message: error.message || "Error in booking",
        success: false,
        });
    }
    };

    export const getMyBooking = async (req, res) =>{
        try {
            const userId = req.userId;

            const bookings = await BookingModel.find({userId}).populate("eventId")

            return res.json({
                success :true,
                bookings
            })
        } catch (error) {
            return res.status(500).json({
                error : "Error in getMyBooking"|| error.message,
                success : false
            })
        }
    }

    export const updateBookingSatus = async (req , res) =>{
        try {
            const {id} = req.params;

            const booking = await BookingModel.findByid(id)

            if(!booking){
                return res.status(403).json({
                    message : "Booking not found",
                    success : false
                })
            }

            booking.status = 'Confirmed'
            booking.save()

            return res.status(200).json({
                message : "booking confirmed",
                success : true
            })

        } catch (error) {
            return res.status(500).json({
                error : "Error in updateBookingSatus" || error.message
            })
        }
    }

    