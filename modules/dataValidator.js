const START_CHAR = '@';
const END_CHAR = 'x';

const UPPERCASE_LETTERS = /[A-Z]+/g;
const TURNS = /[A-Z+]+/g;
const STARTING_POINT = /^[^@]*@[^@]*$/;
const FINISH_POINT = /^[^x]*x[^x]*$/;
const VALID_CHARS = /[x+A-Z|-]/g;

const matchingValidChar = (input) => (input?.match(VALID_CHARS) ? true : false);
const matchingUpperCaseChars = (input) =>
	input?.match(UPPERCASE_LETTERS) ? true : false;
const matchingTurns = (input) => (input?.match(TURNS) ? true : false);
const matchingStartingPoint = (input) =>
	input?.match(STARTING_POINT) ? true : false;
const matchingFinishPoint = (input) =>
	input?.match(FINISH_POINT) ? true : false;

const getStartPosition = (normalizedArray) => {
	let startingPosition = null;
	//stringify map and check for invalid chars
	const flatStringFromArray = normalizedArray.join('');

	if (!matchingStartingPoint(flatStringFromArray))
		throw Error('Only one starting point allowed');
	if (!matchingFinishPoint(flatStringFromArray))
		throw Error('Only one ending point allowed');

	//find starting point
	normalizedArray.map((rowData, rowNumber) => {
		if (matchingStartingPoint(rowData)) {
			startingPosition = {
				startingPoint: [rowData.indexOf(START_CHAR), rowNumber],
			};
		}
	});

	return startingPosition;
};

module.exports = {
	getStartPosition: getStartPosition,
	matchingTurns: matchingTurns,
	matchingValidChar: matchingValidChar,
	matchingUpperCaseChars: matchingUpperCaseChars,
	END_CHAR: END_CHAR,
	TURNS: TURNS,
};
