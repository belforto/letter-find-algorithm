const { logger } = require('./logger');

const { matchingValidChar } = require('./dataValidator');

const getUniqueLettersString = (arrayWithDuplicates) => {
	//make set & remove duplicates
	let uniq = [...new Set(arrayWithDuplicates)];
	//extract letters
	uniq = uniq.map((letter) => letter.split(';')[0]);

	return uniq.join('');
};
const getCharAtPosition = (normalizedArray, x, y) => {
	try {
		const char = normalizedArray[y].charAt(x);
		if (!matchingValidChar(char)) {
			throw Error(`Got Invalid char ${char}`);
		}
		return char;
	} catch (error) {
		throw Error(`Error getting chat at ${x}, ${y} => ${error.message}`);
	}
};
const getNextCharAndPosition = (
	direction,
	currentPosition,
	normalizedArray
) => {
	let nextChar = null;

	//get element in direction
	switch (direction) {
		case 'RIGHT':
			//get element position
			const nextElementRight = [currentPosition[0] + 1, currentPosition[1]];

			nextChar = getCharAtPosition(
				normalizedArray,
				nextElementRight[0],
				nextElementRight[1]
			);

			return {
				nextChar: nextChar,
				position: [nextElementRight[0], nextElementRight[1]],
			};

		case 'DOWN':
			const nextElementDown = [currentPosition[0], currentPosition[1] + 1];

			nextChar = getCharAtPosition(
				normalizedArray,
				nextElementDown[0],
				nextElementDown[1]
			);

			return {
				nextChar: nextChar,
				position: [nextElementDown[0], nextElementDown[1]],
			};

		case 'LEFT':
			const nextElementLeft = [currentPosition[0] - 1, currentPosition[1]];

			nextChar = getCharAtPosition(
				normalizedArray,
				nextElementLeft[0],
				nextElementLeft[1]
			);

			return {
				nextChar: nextChar,
				position: [nextElementLeft[0], nextElementLeft[1]],
			};

		case 'UP':
			const nextElementUp = [currentPosition[0], currentPosition[1] - 1];

			nextChar = getCharAtPosition(
				normalizedArray,
				nextElementUp[0],
				nextElementUp[1]
			);

			return {
				nextChar: nextChar,
				position: [nextElementUp[0], nextElementUp[1]],
			};

		default:
			break;
	}
};

//---------------------------------------------------
//Finds direction in array by taking into the account
// previous position at the current point
//---------------------------------------------------
const findDirection = (currentPoint, normalizedArray, previousDirection) => {
	let numberOfPossibleTurns = 0;
	let direction = null;
	logger.debug(`Current point -> ${currentPoint} `);

	const x = currentPoint[0];
	const y = currentPoint[1];

	const directionRight = [x + 1, y, 'RIGHT'];
	const directionDown = [x, y + 1, 'DOWN'];
	const directionLeft = [x - 1, y, 'LEFT'];
	const directionUp = [x, y - 1, 'UP'];

	let nextAllowedPosition = null;

	switch (previousDirection) {
		case 'RIGHT':
			nextAllowedPosition = [directionDown, directionUp];
			break;
		case 'LEFT':
			nextAllowedPosition = [directionDown, directionUp];
			break;
		case 'DOWN':
			nextAllowedPosition = [directionLeft, directionRight];
			break;
		case 'UP':
			nextAllowedPosition = [directionLeft, directionRight];
			break;

		default:
			nextAllowedPosition = [
				directionRight,
				directionDown,
				directionLeft,
				directionUp,
			];
			break;
	}

	// find next position in list of allowed positions
	for (let index = 0; index < nextAllowedPosition.length; index++) {
		const currentPosition = nextAllowedPosition[index];
		try {
			//check next position in direction or throw error if not valid
			const nextChar = getCharAtPosition(
				normalizedArray,
				currentPosition[0],
				currentPosition[1]
			);
			logger.info(`Found valid next char -> ${nextChar}`);

			direction = currentPosition[2];
			numberOfPossibleTurns += 1;
		} catch (error) {
			logger.debug(`ERROR finding direction -> [${error.message}]`);
			continue;
		}
	}

	if (direction === null) throw Error('Cant find direction');
	//can't be more then one direction
	if (numberOfPossibleTurns != 1) throw Error('Fork found');

	return direction;
};

module.exports = {
	getNextCharAndPosition: getNextCharAndPosition,
	getCharAtPosition: getCharAtPosition,
	getUniqueLettersString: getUniqueLettersString,
	findDirection: findDirection,
};
