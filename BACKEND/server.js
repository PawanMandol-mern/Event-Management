    import dotenv from "dotenv";
    import express from "express";
    import connectDB from "./config/db.js";
    import userRouter from "./routes/UserRoutes.js";
    import cors from "cors";
    import eventRoutes from "./routes/EventRoutes.js";
    import fileupload from "express-fileupload";
    import { v2 as cloudinary } from "cloudinary";
    import cookieParser from "cookie-parser";
    import bookingRoutes from "./routes/BookingRoutes.js";
    import contactRouter from "./routes/ContactRoutes.js";

    dotenv.config();
    const app = express();

    // ✅ Middlewares
    app.use(express.json());
    app.use(cookieParser());

    // ✅ CORS FIX (FINAL)
    app.use(
    cors({
        origin: true,
        credentials: true,
    })
    );

    // ❌ REMOVE THIS (error de raha tha)
    // app.options("*", cors());

    app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "./tmp/",
    })
    );

    // ✅ Cloudinary config
    cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    });

    // ✅ Routes
    app.use("/api/users", userRouter);
    app.use("/api/events", eventRoutes);
    app.use("/api/booking", bookingRoutes);
    app.use("/api/contact", contactRouter);

    // ✅ Default route (test ke liye)
    app.get("/", (req, res) => {
    res.send("API Running...");
    });

    // ✅ Server start
    const PORT = process.env.PORT || 3000;

    connectDB();

    app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });