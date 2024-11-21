const express = require('express');
const Expense = require('../models/Expense');

const router = express.Router();

//Adding an expense

router.post('/', async(req, res) => {
    try{


        const {userId, text, amount} = req.body;
        if (!userId || !text || !amount){
          return res.status(400).json({error : 'all fields required'});
        }
        const newExpense = new Expense({userId, text, amount});

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Get Expenses
router.get('/:userId', async (req, res) => {
    try {
      const expenses = await Expense.find({ userId: req.params.userId });
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // deleting an expense
  router.delete('/:id', async (req, res) => {
    try {
      const expense = await Expense.findByIdAndDelete(req.params.id);
      if (!expense){
        return res.status(404).json({error: 'Expense not found'});
      }
      res.json({message: 'expense deleted'});
    } catch (err){
      res.status(500).json({ error: err.message});
    }
  })

module.exports = router;