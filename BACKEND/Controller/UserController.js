import UserModel from "../Model/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req , res) =>{
    try {
        const {fullName, email , password, role} = req.body;

        if(!fullName || !email || !password || !role){
            return res.status(403).json({
                message : "All fields are required",
                success : false
            })
        }

        const exitsUser = await UserModel.findOne({email})

        if(exitsUser){
            return res.status(401).json({
                message : "email already use",
                success : false
            })
        }

        const hashPassword = await bcrypt.hash(password , 10)

        const newCreateUser = await UserModel.create({
            fullName,
            email,
            password : hashPassword,
            role
        })

        return res.status(201).json({
            message : "register successfully",
            success : true,
            newCreateUser
        })

    } catch (error) {
        return res.status(500).json({
            error : "Error in register" || error.message,
            success : false
        })
    }
}

export const login = async (req , res) =>{
    try {
        const {email , password } =req.body;

        if(!email || !password ) {
            return res.status(403).json({
                message : "Email or Password are required",
                success : false
            })
        }

        const exitsUser = await UserModel.findOne({email})

        if(!exitsUser){
            return res.status(403).json({
                message : "Email is not exits",
                success : false
            })
        }

        const isMatch = await bcrypt.compare(password , exitsUser.password)

        if(!isMatch){
            return res.status(403).json({
                message : "Password is incorrect, Please Enter the valid password",
                success : false
            })
        }
            
        const token = jwt.sign({id : exitsUser._id, role:exitsUser.role},process.env.JWT_SECRET,{expiresIn : '7d'})

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "Strict" });

        return res.status(200).json({
            message : "User login successfully",
            success : true,
            token,
            user : {id : exitsUser.id, role : exitsUser.role, fullName : exitsUser.fullName}
        })
    } catch (error) {
        return res.status(500).json({
            error : "Error in login" || error.message,
            success : false
        })
    }
}

export const logout = async (req ,res) =>{
    try {
        res.clearCookie("token","",{
            httpOnly : true,
            secure : true,
            sameSite : "Strict"
        })

        return res.status(200).json({
            message : "Logout successfully",
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            error : "Error in login" || error.message,
            success : false
        })
    }
}

export const getUsersById = async (req , res) =>{
    try {
        const userId = req.params.id;

        const user = await UserModel.findById(userId)
        console.log("user",user)
        if(!user){
            return res.status(403).json({
                message : "User not found",
                success : false
            })
        }

        return res.status(200).json({
            message :"user Found successfully",
            success : true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            error : "Error in getUserById" || error.message,
            success : false
        })
    }
}

export const getMe = async (req, res) => {
    try {
    const userId = req.userId; // Protect middleware se aana chahiye
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({ message: "User fetched successfully", success: true, user });
    } catch (error) {
    return res.status(500).json({ message: error.message || "Error in getMe", success: false });
    }
};