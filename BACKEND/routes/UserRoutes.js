import express from "express"
import { getMe, getUsersById, login, logout, register } from "../Controller/UserController.js"
import { Protect } from "../Middleware/Protect.js"

const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/logout",logout)

userRouter.get("/me",Protect, getMe)

userRouter.get("/:id",getUsersById)

export default userRouter