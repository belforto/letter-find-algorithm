const { logger } = require('./logger');

const {
	getNextCharAndPosition,
	findDirection,
	getUniqueLettersString,
} = require('./arrayNavigator');
const {
	getStartPosition,
	END_CHAR,
	matchingUpperCaseChars,
} = require('./dataValidator');
const { convertStringToNormalizedArray } = require('./prepareData');
const { readFile } = require('./readFile');

const collectionAlgo = async (inputFileName) => {
	const rawDataString = readFile(inputFileName || 'basic.txt');

	const normalizedArray = convertStringToNormalizedArray(rawDataString);

	const startingPointObject = getStartPosition(normalizedArray);

	let direction = null;
	let position = startingPointObject.startingPoint;

	const collectedLetters = [];
	const collectedPath = ['@'];

	loopMain: while (true) {
		//find direction
		direction = findDirection(position, normalizedArray, direction);
		logger.info(`Changing direction going -> ${direction} `);

		// follow the direction
		loopDirection: while (true) {
			await sleep(3);
			try {
				const newCharAndPosition = getNextCharAndPosition(
					direction,
					position,
					normalizedArray
				);
				//UPDATE current position and char
				position = newCharAndPosition.position;
				currentChar = newCharAndPosition.nextChar;

				logger.info(`Found char ${currentChar} at position [${position}]`);

				collectedPath.push(currentChar);

				logger.info(`Collected path -> ${collectedPath.join('')} `);

				//SAVE letter to collection
				if (matchingUpperCaseChars(currentChar)) {
					collectedLetters.push(`${currentChar};${position.toString()}`);
				}

				//break direction on turn
				if (currentChar === '+') {
					throw Error('Turn found');
				}

				if (currentChar === END_CHAR) throw Error('End found');
			} catch (error) {
				if (error.message === 'End found') {
					break loopMain;
				}
				//break and look for another direction
				break loopDirection;
			}
		}
	}

	const uniqueLetters = await getUniqueLettersString(
		collectedLetters
	).toString();

	return {
		letters: uniqueLetters,
		path: collectedPath.join(''),
	};
};

//slow down execution to see all the steps
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
	collectionAlgo: collectionAlgo,
};
