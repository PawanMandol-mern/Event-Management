    import jwt from "jsonwebtoken";

    export const Protect = (req, res, next) => {
    try {
        const token = req.cookies.token; 

        if (!token) {
        return res.status(401).json({ message: "Not authorized, token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // ✅ ye getMe me use hoga
        // req.userRole = decoded.role; // optional
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is invalid or expired" });
    }
    };

    export const isAdminProtect = (req, res, next) => {
        try {
            if (req.role !== "admin") {
                return res.status(403).json({
                    message: "Admin only access",
                    success: false
                })
            }

            next()
        } catch (error) {
            return res.status(500).json({
                error: error.message,
                success: false
            })
        }
    }