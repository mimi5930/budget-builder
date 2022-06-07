const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;
