const router = require('express').Router();
const { Transaction } = require('../model');
const { endOfMonth } = require('date-fns');

// get all transactions
router.get('/api', async (req, res) => {
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
router.get('/api/transactions', async (req, res) => {
  let { month, endMonth, year, endYear, type } = req.query;
  if (month && year && endMonth && endYear && type) {
    try {
      const transactions = await Transaction.find({
        $and: [
          {
            date: {
              $gte: new Date(`${month}/01/${year}`),
              $lt: endOfMonth(new Date(`${endMonth}/01/${endYear}`))
            }
          },
          { description: new RegExp(type, 'i') }
        ]
      })
        .sort({ date: 1 })
        .select('-__v');

      res.json(transactions);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (month && year && endMonth && endYear) {
    try {
      const transactions = await Transaction.find({
        date: {
          $gte: new Date(`${month}/01/${year}`),
          $lt: endOfMonth(new Date(`${endMonth}/01/${endYear}`))
        }
      })
        .sort({ date: 1 })
        .select('-__v');

      res.json(transactions);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (month && year && type) {
    try {
      const transactions = await Transaction.find({
        $and: [
          {
            date: {
              $gte: new Date(`${month}/01/${year}`),
              $lt: endOfMonth(new Date(`${month}/01/${year}`))
            }
          },
          { description: new RegExp(type, 'i') }
        ]
      })
        .sort({ date: 1 })
        .select('-__v');

      res.json(transactions);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (month && year) {
    try {
      const transactions = await Transaction.find({
        date: {
          $gte: new Date(`${month}/01/${year}`),
          $lt: endOfMonth(new Date(`${month}/01/${year}`))
        }
      })
        .sort({ date: 1 })
        .select('-__v');
      res.json(transactions);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (type) {
    try {
      const transactions = await Transaction.find({
        description: new RegExp(type, 'i')
      })
        .sort({ date: 1 })
        .select('-__v');
      res.json(transactions);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(404).json({ message: 'Invalid queries' });
  }
});

module.exports = router;
