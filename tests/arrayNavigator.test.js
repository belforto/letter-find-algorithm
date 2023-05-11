const {
	getNextCharAndPosition,
	getCharAtPosition,
	getUniqueLettersString,
	findDirection,
} = require('../modules/arrayNavigator');

const normalizedArray = [
	'   @--A--x',
	'          ',
	'  x-B-+   ',
	'      |   ',
	'      @   ',
	'          ',
	'       |  ',
	'      -+  ',
	'       |  ',
];

it('gets char at position in 2d array ', () => {
	expect(getCharAtPosition(normalizedArray, 6, 3)).toEqual('|');
});

it('moves in direction from position and grabs char', () => {
	expect(
		getNextCharAndPosition('UP', [6, 3], normalizedArray).nextChar
	).toEqual('+');
});

it('returns unique letters from string array with duplicates', () => {
	expect(getUniqueLettersString(['A', 'A', 'B', 'C', 'C', 'C'])).toEqual('ABC');
});

it('finds new direction on turn', () => {
	expect(findDirection([6, 2], normalizedArray, 'UP')).toEqual('LEFT');
});
it('cant return previous position', () => {
	expect(findDirection([6, 2], normalizedArray, 'RIGHT')).not.toEqual('LEFT');
});
it('cant return multiple directions', () => {
	try {
		findDirection([7, 7], normalizedArray, 'RIGHT');
	} catch (error) {
		expect(error.message).toEqual('Fork found');
	}
});
