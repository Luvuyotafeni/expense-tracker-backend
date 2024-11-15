const express = require('express');
const Income = require('../models/Income');

const router = express.Router();


// adding an income
router.post('/', async (req, res) => {
    try {
        const {userId, text, amount} = req.body;
        const newIncome = new Income({userId, text, amount});
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

//getting the income
router.get('/:userId', async (req, res) => {
    try {
        const income = await Income.find({userId: req.params.userId});
        res.json(income);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;