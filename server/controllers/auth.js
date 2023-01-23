import bcrypt from "bcrypt"; // encrypting our password
import jwt from "jsonwebtoken"; // a way to send users a webtoken for authorization
import User from "../models/User.js"

/* Register User */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt= await bcrypt.genSalt(); // provide random salt by bcrypt
        const passwordHash = await bycrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUsed);
    } catch (err) {
        res.status(500).json({ error: err.message }); // to send this if there is an error
    }
}