const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const router = express.Router();
require('dotenv').config();

// Registering a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) return res.status(400).json({ message: 'User does not exist' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid password' });
  
      // Log the successful login message and user ID to the console
      console.log('Login successful');
      console.log('User ID:', user._id);
  
      // Return the user ID along with the message
      res.json({ message: 'Login successful', userId: user._id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  


module.exports = router;
