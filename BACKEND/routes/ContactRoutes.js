import express from "express"
import { Contact } from "../Controller/ContactController.js"

const contactRouter = express.Router()

contactRouter.post("/contact",Contact)

export default contactRouter