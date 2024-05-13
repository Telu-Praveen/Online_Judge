const express = require('express');
const user = require('../model/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const register = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the information");
        }
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(200).send("User already exists!");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // save the user in DB
        const user1 = await user.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user1.token = token;
        user1.password = undefined;
        res.status(200).json({ message: "You have successfully registered!", user1 });
    } catch (error) {
        console.log(error);
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check that all the data should exists
        if (!(email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        //find the user in the database
        const user1 = await user.findOne({ email });
        if (!user1) {
            return res.status(401).send("User not found!");
        }

        //match the password
        const enteredPassword = await bcrypt.compare(password, user1.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }
        //send the token
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user1.token = token;
        user1.password = undefined;

        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, //only manipulate by server not by client/user
        };
        console.log("success")
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });

    }
    catch (error) {
        console.log(error);
    }
}

module.exports={
register,login
}