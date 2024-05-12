const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv=require('dotenv');
const cors  = require('cors');
const {router} = require('./routes/route.js');
const {DBConnection} = require('./database/db.js');


dotenv.config();
const PORT=8000;
DBConnection();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",router)

app.listen(PORT, () => console.log(`server is running on ${PORT}`));