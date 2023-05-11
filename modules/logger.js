const { format, createLogger, transports } = require('winston');

const { combine, printf } = format;

const customFormat = printf(({ level, message }) => {
	return ` [ ${level.toLocaleUpperCase()} ] : ${message}`;
});

const logger = createLogger({
	level: 'error',
	// level: 'debug',
	format: combine(customFormat),
	transports: [new transports.Console()],
});
module.exports = {
	logger: logger,
};
