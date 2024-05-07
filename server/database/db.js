const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import router from "../routes/route";

dotenv.config();

const DBConnection = async () => {
    //const USERNAME = process.env.DB_USERNAME;
    //const PASSWORD = process.env.DB_PASSWORD;

    const MONGO_URI = process.env.MONGO_URL;
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

module.exports={
    DBConnection
}