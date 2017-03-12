//import the createServer function
const hapi_server = require('./server.js');
//grab the port
const port = process.argv[2];
//grab log configs
const logConfig = require('./logs.conf.js');

const server = hapi_server.createServer(port);

server.start();
console.log('server running on port:' + port);
