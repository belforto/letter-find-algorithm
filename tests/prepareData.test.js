const {
	convertStringToNormalizedArray,
	normalizeArray,
	getArrayDimensions,
	makeBlankArray,
} = require('../modules/prepareData');

describe('Validate blank array creation', () => {
	it('matches making blank array ', () => {
		expect(makeBlankArray(1, 3)).toEqual([' ', ' ', ' ']);
	});
});

describe('Validate getting array dimensions', () => {
	it('creates array with 3 rows and longest line od 5 chars ', () => {
		expect(getArrayDimensions(['', '', '     '])).toEqual({
			height: 3,
			width: 5,
		});
	});
	it('creates array with 1 row and longest line od 5 chars ', () => {
		expect(getArrayDimensions(['     '])).toEqual({
			height: 1,
			width: 5,
		});
	});
});

describe('_INTEGRATION_ Validate normalization of array', () => {
	it('makes normalized array out of jagged array ', () => {
		const inputArray = ['a', 'bb', 'ccc'];
		expect(
			normalizeArray(
				inputArray,
				makeBlankArray(
					getArrayDimensions(inputArray).width,
					getArrayDimensions(inputArray).height
				)
			)
		).toEqual(['a  ', 'bb ', 'ccc']);
	});

	it('makes normalized array out of jagged array size 3x3 ', () => {
		const inputArray = ['111', '222', ''];
		expect(
			normalizeArray(
				inputArray,
				makeBlankArray(
					getArrayDimensions(inputArray).width,
					getArrayDimensions(inputArray).height
				)
			)
		).toEqual(['111', '222', '   ']);
	});

	it('fails on providing empty array []', () => {
		try {
			const inputArray = [];
			expect(
				normalizeArray(
					inputArray,
					makeBlankArray(
						getArrayDimensions(inputArray).width,
						getArrayDimensions(inputArray).height
					)
				)
			);
		} catch (e) {
			expect(e.message).toBe('No empty array allowed');
		}
	});
});
