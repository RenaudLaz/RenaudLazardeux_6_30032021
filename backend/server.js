/*créer un serveur Node*/
const http = require('http'); //package HTTP natif de Node
const app = require('./app');

const normalizePort = val => { //normalizePort : renvoie un port valide
  const port = parseInt(val, 10);
  if (isNaN(port)) {return val;}
  if (port >= 0) {return port;}
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => { //errorHandler : recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur 
  if (error.syscall !== 'listen') {throw error;}
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

/*création dossier images*/
const mkdirp = require('mkdirp');
mkdirp('./images').then(made =>
console.log(`Création du dossier images`));

server.listen(port); //se démarre avec 'node server' ou 'nodemon server' 
