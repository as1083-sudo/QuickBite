import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";



// app configurations
const app = express();
const port = process.env.PORT || 4000;


app.use(express.json()); // For parsing json bodies coming to backend

// Explicitly allow CORS from any origin. This is permissive (public API).
// For production, restrict `origin` to your frontends.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    next();
});


// DB Connection 
connectDB();

// API Endpoint 
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Http Requests
app.get('/', (req, res) => {
    res.send("API Working")
});


// To Run on port 4000
app.listen(port,()=>{
    console.log(`Server Running on http://localhost:${port}`)
})
