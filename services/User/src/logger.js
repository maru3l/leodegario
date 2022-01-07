import {createLogger, format, transports} from 'winston';

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: {service: 'user-service'},
  transports: [
    new transports.File({
      level: 'info',
      filename: './logs/error.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
