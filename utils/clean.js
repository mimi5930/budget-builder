const data = require('../input');

const dataClean = data => {
	// needs to be made async somehow because of large quantity of data
	const parsedData = data.forEach(transaction => {
		let { Date, Description, Amount, Balance } = transaction;
		return { Date, Description, Amount, Balance };
	});

	console.log(parsedData);
};

dataClean(data);
