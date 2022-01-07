import http from 'http';
import app from './app';
import dbo from './database/conn';
import logger from './logger';

require('dotenv').config();

const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);

    // eslint-disable-next-line no-fallthrough
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);

    // eslint-disable-next-line no-fallthrough
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();

  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  logger.info(`Listening on ${bind}`);
}

function onTerminated() {
  dbo.close();

  logger.info('Closed database connection');
  // process.exit(0)
}

function onKilled() {
  dbo.close();

  logger.info('Closed database connection');
  // process.exit(0)
}

export default async function init() {
  process.on('SIGTERM', onTerminated);

  process.on('SIGKILL', onKilled);
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);

  await dbo.connectToServer();

  server.on('error', onError);

  server.on('listening', onListening);
}

init();
