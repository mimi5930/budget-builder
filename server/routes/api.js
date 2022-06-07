const router = require('express').Router();
const { Transaction } = require('../model');
const { endOfMonth } = require('date-fns');

// get all transactions
router.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ date: 1 })
      .select('-__v');
    res.json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get transaction by month
router.get('/api/transactions/month/', async (req, res) => {
  if (req.query.month && req.query.year) {
    try {
      const transactions = await Transaction.find({
        date: {
          $gte: new Date(`${req.query.month}/01/${req.query.year}`),
          $lt: endOfMonth(new Date(`${req.query.month}/01/${req.query.year}`))
        }
      })
        .sort({ date: 1 })
        .select('-__v');
      res.json(transactions);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json({ message: 'Please enter a month and a year' });
  }
});

// get transaction by type
router.get('/api/transactions/type/:type', async (req, res) => {
  try {
    const transactions = await Transaction.find({
      description: new RegExp(req.params.type, 'i')
    })
      .sort({ date: 1 })
      .select('-__v');
    res.json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
