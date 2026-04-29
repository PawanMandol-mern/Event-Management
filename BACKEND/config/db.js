import mongoose from "mongoose"

const  connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Seerver connect to the DB')
    } catch (error) {
        console.log('Server Error in DB',error)
    }
}

export default connectDB