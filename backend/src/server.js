// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';

dotenv.config();
const app=express();
const __dirname=path.resolve();

const PORT= ENV.PORT || 3000;

app.use(express.json())//req.body// to parse incoming JSON data in request bodies
app.use(cors({origin: ENV.CLIENT_URL,credentials: true}))//to enable cross-origin requests from different domains
app.use(cookieParser())//req.cookies//to parse cookies from incoming requests
 
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

//make ready for deployment
if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log("server running on port port: "+PORT)
    connectDB();
})
