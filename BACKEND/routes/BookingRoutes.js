import express from "express"
import { isAdminProtect, Protect } from "../Middleware/Protect.js"
import { booking, getMyBooking, updateBookingSatus } from "../Controller/BookingController.js"

const bookingRoutes = express.Router()

bookingRoutes.post("/booking/:id",Protect, booking)

bookingRoutes.put("/update-status/:id", Protect, isAdminProtect, updateBookingSatus)

bookingRoutes.get("/my-bookings",Protect, getMyBooking)

export default bookingRoutes