const http = require('http');
const app = require('./app');

const normalizePort = (value) => {
  const port = parseInt(value, 10);

  if (isNaN(port)) {
    return value;
  }

  if (port >= 0) {
    return port
  }

  return false

}

const PORT = normalizePort(process.env.PORT || '3000');
app.set('port', PORT);

const getBind = (address) => {
  return typeof address === 'string' ? 'pipe ' + address : 'port: ' + PORT;
}

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const address = server.address();
  const bind = getBind(address);

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' required elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = getBind(address);
  console.log('Listening on ' + bind)
})

server.listen(PORT);