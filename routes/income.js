const express = require('express');
const Income = require('../models/Income');

const router = express.Router();


// adding an income
router.post('/', async (req, res) => {
    try {
        const {userId, text, amount} = req.body;

         if (!userId || !text || !amount){
            return res.status(400).json({error : 'all fields required'})
         }
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


// deleting the income
router.delete('/:id', async (req, res) => {
    try {
        console.log(`Deleting income with ID: ${req.params.id}`);
        const income = await Income.findByIdAndDelete(req.params.id);
        if (!income) {
            return res.status(404).json({ error: 'Income not found' });
        }
        res.json({ message: 'Income deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;