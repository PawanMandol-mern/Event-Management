import EventModel from "../Model/EventModel.js";
import { v2 as cloudinary } from 'cloudinary'

    export const createEvent = async (req, res) => {
    try {
        // ✅ check file
        if (!req.files || !req.files.image) {
        return res.status(400).json({
            message: "Image file is required",
            success: false
        });
        }

        const { image } = req.files;

        // ✅ validate format
        const allowedFormat = ["image/jpeg", "image/png"];

        if (!allowedFormat.includes(image.mimetype)) {
        return res.status(400).json({
            message: "Only JPG/PNG allowed",
            success: false
        });
        }

        // ✅ upload to cloudinary
        const result = await cloudinary.uploader.upload(image.tempFilePath);

        // ✅ get body data
        const { title, description, price, category } = req.body;

        if (!title || !description || !price || !category) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
        }

        // ✅ save in DB
        const event = await EventModel.create({
        title,
        description,
        price,
        category,
        image: {
            public_id: result.public_id,
            url: result.secure_url,
        }
        })

        return res.status(201).json({
        message: "Event created successfully",
        success: true,
        event
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
        message: error.message,
        success: false
        });
    }
    };

    export const getAllEvents = async (req , res) =>{
        try {
            const event = await EventModel.find()
            if(!event){
                return res.status(404).json({
                    success: false,
                    message: "Event not found"
                })
            }
            return res.status(200).json({
                success: true,
                event
            })
        } catch (error) {
        console.log(error)
        return res.status(500).json({
        error: "Error in Get All Event" || error.message,
        success: false,
        });
    }
    }

    export const getEventsById = async (req , res) =>{
        try{
            const eventId = req.params.id;

            const event = await EventModel.findById(eventId)

            if(!event){
                return res.status(404).json({
                    success: false,
                    message: "Event not found"
                })
            }

            return res.status(200).json({
                success: true,
                event
            })
        }
        catch (error) {
        console.log(error)
        return res.status(500).json({
        error: "Error in GetEvent byId" || error.message,
        success: false,
        });
    }
    }

    export const updateEvent = async ( req ,res) =>{
        try{
            const userId = req.params.id;
            const eventData = req.body;

            const event = await EventModel.findByIdAndUpdate(userId, eventData, {new: true})

            if(!event) {
                return res.status(400).json({
                    message : "Events not found",
                    success : false
                })
            }

            return res.status(200).json({
            message : "Update successfully",
            success : true,
            event
            })

        }
        catch (error) {
        console.log(error)
        return res.status(500).json({
        error: "Error in update Events" || error.message,
        success: false,
        });
    }
    }