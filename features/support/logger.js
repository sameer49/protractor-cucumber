var winston = require('winston');
var gv = require('./globalVariables');
var outputDir = gv.reportDir;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: outputDir + 'error.log', level: 'error' }),
      new winston.transports.File({ filename: outputDir + 'combined.log' })
    ],
    exitOnError: false
  });

module.exports = logger;