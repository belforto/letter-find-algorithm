const { readFile } = require('../modules/readFile');

describe('Reading the file', () => {
	it('no empty file', () => {
		expect(readFile('basic.txt')).not.toBe('');
	});
});
