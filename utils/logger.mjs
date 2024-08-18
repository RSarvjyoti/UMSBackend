import winston from 'winston';

// Configure the logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Create a middleware function to log requests
const requestLogger = (req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
};

export { logger, requestLogger };
