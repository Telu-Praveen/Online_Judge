const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv=require('dotenv');
const cors  = require('cors');
const {router} = require('./routes/route.js');
const {DBConnection} = require('./database/db.js');


dotenv.config();

DBConnection();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",router)

app.listen(8000, () => console.log("server is running "));