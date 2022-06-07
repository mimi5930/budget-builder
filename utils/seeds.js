const data = require('../dist/data.json');
const db = require('../config/connection');
const { Transaction } = require('../model');

// insert data into db
db.once('open', async () => {
  try {
    // delete old data
    await Transaction.deleteMany();

    console.log('Deleted existing db data');

    // add new data
    await Transaction.insertMany(data);

    console.log('Database Seeded');
    process.exit(0);
  } catch (e) {
    console.error(e);
  }
});
