const fs = require('fs');
const { faker } = require('@faker-js/faker');
const { format: formatDate, add, compareAsc } = require('date-fns');

// array to hold fake data
var data = [];

// transaction prefixes
var transactionNames = ['Point Of Sale Withdrawal', 'External Withdrawal'];

for (let i = 0; i < 800; i++) {
	const transaction = {
		date: formatDate(
			faker.date.between(add(Date.now(), { years: -3 }), Date.now()),
			'MM/dd/yyyy'
		),
		description: faker.lorem.words(5)
	};
	data.push(transaction);
}

data.sort((a, b) => {
	var dateA = new Date(a.date),
		dateB = new Date(b.date);
	return dateA - dateB;
});

for (let i = 0; i < data.length; i++) {
	let currentTotal = data[i - 1]?.balance || 2000,
		amount = 0;
	if (data[i - 1]?.balance < 500)
		amount =
			Math.round(
				100 * faker.datatype.number({ min: 0, max: 500, precision: 0.01 })
			) / 100;
	else if (data[i - 1]?.balance > 20000)
		amount =
			Math.round(
				100 * faker.datatype.number({ min: -500, max: 0, precision: 0.01 })
			) / 100;
	else
		amount =
			Math.round(
				100 * faker.datatype.number({ min: -500, max: 500, precision: 0.01 })
			) / 100;
	data[i].amount = amount;
	data[i].balance = Math.round((currentTotal + data[i].amount) * 100) / 100;
	if (data[i].amount > 0)
		data[i].description = `External Deposit ${data[i].description}`;
	else
		data[i].description = `${faker.helpers.arrayElement(transactionNames)} ${
			data[i].description
		}`;
}

fs.writeFile('./dist/data.json', JSON.stringify(data, null, 2), err => {
	if (err) console.log(err);
	else console.log('data.json successfully written in the dist folder');
});
