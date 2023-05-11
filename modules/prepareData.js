const os = require('os');

const getArrayDimensions = (inputArray) => {
	if (inputArray === null || inputArray.length === 0)
		throw new Error('No empty array allowed');

	const HEIGHT = inputArray.length;
	const MAX_LINE_WIDTH = Math.max(...inputArray.map((el) => el.length));
	return {
		width: MAX_LINE_WIDTH,
		height: HEIGHT,
	};
};
const makeBlankArray = (width, height) => {
	const blankLine = ' '.repeat(width);
	return Array(height).fill(blankLine);
};
const normalizeArray = (jaggedArray, blankArray) => {
	if (
		jaggedArray === null ||
		jaggedArray.length === 0 ||
		blankArray === null ||
		blankArray.length === 0
	) {
		throw new Error('No empty array allowed');
	}

	for (let row = 0; row < blankArray.length; row++) {
		const jaggedRow = jaggedArray[row];
		const blankRow = blankArray[row];
		blankArray[row] = `${jaggedRow}${blankRow.substring(
			jaggedRow.length,
			blankRow.length
		)}`;
	}
	return blankArray;
};

const convertStringToNormalizedArray = (input) => {
	const inputArray = input.split(os.EOL);

	return normalizeArray(
		inputArray,
		makeBlankArray(
			getArrayDimensions(inputArray).width,
			getArrayDimensions(inputArray).height
		)
	);
};

module.exports = {
	convertStringToNormalizedArray: convertStringToNormalizedArray,
	normalizeArray: normalizeArray,
	getArrayDimensions: getArrayDimensions,
	makeBlankArray: makeBlankArray,
};
