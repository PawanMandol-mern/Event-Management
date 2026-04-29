    import mongoose from "mongoose";

    const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        public_id : {
            type : String,
        },
        url :{
            type : String,
        }
    },

    category: {
        type: String,
        enum: ["Wedding", "Birthday", "Corporate"],
    }

    }, { timestamps: true });

    const EventModel = mongoose.model("Event", eventSchema);
    
    export default EventModel