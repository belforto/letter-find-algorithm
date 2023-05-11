const {
	matchingUpperCaseChars,
	matchingTurns,
	getStartPosition,
} = require('../modules/dataValidator');

describe('Validate regex LETTERS', () => {
	it('matches A-Z', () => {
		expect(matchingUpperCaseChars('AAbnAA')).toEqual(true);
	});
	it('false matches on non A-Z', () => {
		expect(matchingUpperCaseChars('asa')).toEqual(false);
	});
	it('false matches on null', () => {
		expect(matchingUpperCaseChars(null)).toEqual(false);
	});
});

describe('Validate regex TURNS', () => {
	it('matches turns on  letter A', () => {
		expect(matchingTurns('A')).toEqual(true);
	});
	it('false matches turns on non A-Z  || +', () => {
		expect(matchingTurns('-')).toEqual(false);
	});
	it('false matches turns on null ', () => {
		expect(matchingTurns(null)).toEqual(false);
	});
	it('matches turns on +', () => {
		expect(matchingTurns('+')).toEqual(true);
	});
});

describe('Validate Starting Position', () => {
	it('matches one starting point', () => {
		const normalizedArray = [
			'     +-O-N-+  ',
			'     |     |  ',
			'     |   +-I-+',
			' @-G-O-+ | | |',
			'     | | +-+ E',
			'     +-+     S',
			'             |',
			'             x',
		];
		expect(getStartPosition(normalizedArray)).toEqual({
			startingPoint: [1, 3],
		});
	});

	it('matches one starting point basic example', () => {
		const normalizedArray = [
			'  @---A---+',
			'          |',
			'  x-B-+   C',
			'      |   |',
			'      +---+',
		];
		expect(getStartPosition(normalizedArray)).toEqual({
			startingPoint: [2, 0],
		});
	});

	it('fails on multiple starting points 1', () => {
		const normalizedArray = [
			'   @--A-@-+',
			'          |',
			'  x-B-+   C',
			'      |   |',
			'      +---+',
		];
		try {
			expect(getStartPosition(normalizedArray));
		} catch (error) {
			expect(error.message).toBe('Only one starting point allowed');
		}
	});

	it('fails on multiple starting points 2', () => {
		const normalizedArray = [
			'   @--A---+',
			'          |',
			'          C',
			'          x',
			'      @-B-+',
		];
		try {
			expect(getStartPosition(normalizedArray));
		} catch (error) {
			expect(error.message).toBe('Only one starting point allowed');
		}
	});

	it('fails on multiple starting points 3', () => {
		const normalizedArray = [
			'   @--A--x',
			'          ',
			'  x-B-+   ',
			'      |   ',
			'      @   ',
		];
		try {
			expect(getStartPosition(normalizedArray));
		} catch (error) {
			expect(error.message).toBe('Only one starting point allowed');
		}
	});

	it('fails on multiple ending points', () => {
		const normalizedArray = ['  x-B-@-A-x'];
		try {
			expect(getStartPosition(normalizedArray));
		} catch (error) {
			expect(error.message).toBe('Only one ending point allowed');
		}
	});
});
