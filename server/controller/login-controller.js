import express from 'express';
import user from '../model/User.js';
import bcrypt from 'bcrypt';


export const register = async (req, res) => {
    try {
        const { firstname, lastname,username,email, password } = req.body;
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
        res.send("User added")
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
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
         res.send("logged in")
        //send the token
        
    }
    catch(error){
        console.log(error);
    }
}