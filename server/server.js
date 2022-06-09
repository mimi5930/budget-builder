// const convertFile = require('./utils/convertData');
const express = require('express');
const cors = require('cors');

// db connection
const db = require('./config/connection');

// express setup
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('./routes/api.js'));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
