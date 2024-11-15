const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require ('../models/users');
const router = express.Router();
require('dotenv').config();

//Registering
router.post('/register', async (req,res) => {
    try {
        const {username, password} = req.body;
        const newUser = new User({ username, password});
        await newUser.save();
        res.status(201).json({message : 'User registered successfully'});
    }
    catch (err){
        res.status(500).json({ error: err.message});
    }
});

//Login Route

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) return res.status(400).json({message: 'user does not exist'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: 'invalid pass'})

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn : '1h'});
        res.json({token})
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;