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
})