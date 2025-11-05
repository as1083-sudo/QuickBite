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

// middleware
// Normalize duplicate slashes in the incoming URL (e.g. `//api` -> `/api`) to avoid
// platform redirects (308) that can strip CORS headers. Do this before other middleware.
app.use((req, res, next) => {
    if (req.url && req.url.includes("//")) {
        req.url = req.url.replace(/\/\/{2,}/g, "/");
    }
    next();
});

app.use(express.json()); // For parsing json bodies coming to backend

// Explicitly allow CORS from any origin. This is permissive (public API).
// For production, restrict `origin` to your frontends.
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

// Ensure OPTIONS preflight responses are handled with CORS headers
app.options("*", cors());


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
