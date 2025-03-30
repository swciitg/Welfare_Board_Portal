import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/user.routes.js";
import { admin,adminRouter } from "./admin_panel/admin-config.js"; // Removed unnecessary import
import cors from "cors";
import bodyParser from "body-parser"; // Explicitly import body-parser

// Initialize dotenv to load environment variables
dotenv.config();

const ADMINPANELROOT = "/welfare-board/api/admin";
const PORT = process.env.PORT || 8000;
const url = process.env.MONGO_URI;
console.log(url);

// Connect to MongoDB
mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
app.use(ADMINPANELROOT, adminRouter);
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200, // Legacy browsers
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Use AdminJS first

// Use body-parser after AdminJS router

// Use express.json() and regular router
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
