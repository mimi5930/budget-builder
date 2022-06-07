const fs = require('fs');
const csv = require('csvtojson');

// convert file to array
const convertFile = async () => {
  // read name of file in input dir
  const inputName = fs.readdirSync('./input')[0];

  const data = await csv().fromFile(`./input/${inputName}`);

  // make data prettier
  const newData = [];
  for await (const obj of data) {
    let { Date: date, Description, Amount, Balance } = obj;
    const newObj = {
      date: new Date(date),
      description: Description.replace(/  +/g, ' '),
      amount: parseFloat(Amount.replace('$', '')),
      balance: parseFloat(Balance.replace(',', '').replace('$', ''))
    };

    newData.push(newObj);
  }

  // save data into dist folder
  fs.writeFile('./dist/data.json', JSON.stringify(newData, null, 2), err => {
    if (err) {
      console.error(err);
    } else {
      console.log('data.json successfully written in the dist folder');
    }
  });
};

convertFile();
// module.exports = convertFile;
