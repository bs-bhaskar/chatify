import mongoose from "mongoose"

export const connectDB= async()=>{
    try{
        const {MONGO_URI}=process.env
        if(!MONGO_URI){
            throw new Error("MONGO_URI is not set or not defined in environment variables")
        }

        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED:",conn.connection.host)
    }catch(error){
        console.error("Error connecting to MongoDB:", error)
        process.exit(1)// 1 status code means failure, 0 means success
    }
}