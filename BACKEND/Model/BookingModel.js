    import mongoose from "mongoose";

    const bookingSchema = new mongoose.Schema(
    {
        clientName: {
        type: String,
        required: true,
        },
        eventDate: {
        type: Date,
        required: true,
        },
        contactNumber : {
            type : String,
            required : true
        },
        Address : {
            type : String,
            required : true
        },
        guests: {
        type: Number,
        },
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
        eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        },
        status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending",
        },
    },
    { timestamps: true },
    );
    bookingSchema.index({ userId: 1, eventId: 1, eventDate: 1 }, { unique: true });

    const BookingModel = mongoose.model("Booking", bookingSchema);
    export default BookingModel;
