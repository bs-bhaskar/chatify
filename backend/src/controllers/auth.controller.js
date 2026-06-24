//test
throw new Error("TEST AUTH CONTROLLER");
//test
import User from "../models/User.js";
//test
console.log("AUTH CONTROLLER VERSION 999");
//test
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import "dotenv/config";
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({ message: "All fields are required" })
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        //check if email is valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({email});//in short write email: email as email
        if (user) {
            return res.status(400).json({ message: "Email already exists" })
        }
        //123456=>hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        if (newUser) {
            //before CR
            // const token = generateToken(newUser._id, res);
            // await newUser.save();

            //after CR
            //persist first, then issue the cookie
            //test
            console.log("1");
            const savedUser = await newUser.save();
            console.log("2");
            // generateToken(savedUser._id, res);
            //test
            res.status(201).json({ 
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
            //test
            console.log("3");
            //test
            try{
                //test
                // await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL);
                //test
            }catch(error){
                console.error("Error sending welcome email:", error);
            }
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) { 
        // console.log("Error in signup controller:", error);
        // res.status(500).json({ message: "Internal server error" })
        //test
        console.log("FULL ERROR:");
    console.dir(error, { depth: null });

    if (!res.headersSent) {
        return res.status(500).json({
            message: error.message,
        });
    }
        //test
    }
}