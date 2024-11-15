const express = require('express');
const Expense = require('../models/Expense');

const router = express.Router();

//Adding an expense

router.post('/', async(req, res) => {
    try{
        const {userId, text, amount} = req.body;
        const newExpense = new Expense({userId, text, amount});

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;