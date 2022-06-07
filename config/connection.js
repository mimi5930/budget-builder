const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/budget-builder'
);

module.exports = mongoose.connection;
