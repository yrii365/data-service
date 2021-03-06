const winston = require('winston');
const { omit } = require('ramda');

const {
  format: { combine, timestamp, printf },
} = winston;
const omitLevel = omit(['level']);
const myFormat =
  process.env.NODE_ENV === 'development'
    ? printf(obj => JSON.stringify(omitLevel(obj), null, 2))
    : printf(obj => JSON.stringify(omitLevel(obj)));

const JSONFormat = combine(timestamp(), myFormat);

const consoleTransport = new winston.transports.Console({
  format: JSONFormat,
});

// Initialization
const createLogger = () =>
  winston.createLogger({
    level: 'debug',
    transports: [consoleTransport],
  });

module.exports = createLogger;
