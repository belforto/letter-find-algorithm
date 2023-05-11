const { collectionAlgo } = require('./modules/algoritm');
const { logger } = require('./modules/logger');

const main = async () => {
	const result = await collectionAlgo('input.txt');

	logger.warn(`Letters found -> ${result.letters} on path -> ${result.path}`);
};
main();
