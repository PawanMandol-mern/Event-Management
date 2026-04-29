import express from "express"
import { createEvent, getAllEvents, getEventsById, updateEvent } from "../Controller/EventController.js"
import { isAdminProtect, Protect } from "../Middleware/Protect.js"

const eventRoutes = express.Router()

eventRoutes.post("/create-event",Protect, createEvent)
eventRoutes.get('/all-events', getAllEvents)
eventRoutes.get('/:id', getEventsById)
eventRoutes.patch('/update/:id',isAdminProtect, updateEvent)

export default eventRoutes;