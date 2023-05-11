const fs = require('fs');
const path = require('path');

const readFile = (fileName) => {
	try {
		const inputPath = `${process.cwd()}${path.sep}tests${path.sep}data${
			path.sep
		}${fileName}`;
		const data = fs.readFileSync(inputPath, 'utf8');

		return data;
	} catch (err) {}
};

exports.readFile = readFile;
