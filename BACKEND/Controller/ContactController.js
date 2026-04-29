import ContactModel from "../Model/Contact.js";

export const Contact = async (req , res) =>{
    try {
        const {name , email , message} = req.body;

        if(!name || !email || !message){
            return res.status(400).json({
                message :"please enter the all fields",
                success : false
            })
        }

        const contact = await ContactModel.create({
            name,
            email,
            message
        })

        return res.status(200).json({
            message : "Message successfull send",
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            error : "Error in contact Controller" || error.message,
            success : false
        })
    }
}