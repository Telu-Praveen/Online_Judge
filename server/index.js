import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import router from './routes/route.js';
import dotenv from 'dotenv'
import DBConnection from './database/db.js';
const app=express();

dotenv.config();

DBConnection();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",router)

app.listen(8000, () => console.log("server is running"));