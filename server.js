'use strict';

const Hapi = require('hapi');
const Logs = require('./models/log.js');
const LogsConf = require('./logs.conf.js');

function createServer(port) {

    const server = new Hapi.Server();
    server.connection({
        port: port,
       routes: { cors: true }
    });

    const options = {
        ops: {
            interval: 1000
        },
        reporters: {
            myConsoleReporter: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    log: '*',
                    response: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout'],
            myFileReporter: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    ops: '*'
                }]
            }, {
                module: 'good-squeeze',
                name: 'SafeJson'
            }, {
                module: 'good-file',
                args: ['./logs/ops_log']
            }],
            myFileReporter2: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    log: '*'
                }]
            }, {
                module: 'good-squeeze',
                name: 'SafeJson'
            }, {
                module: 'good-file',
                args: ['./logs/standard_log']
            }]
        }
    };

    // Logging Route
    server.register({
        register: require('good'),
        options,
    }, (err) => {
        if (err) {
            return console.error(err);
        }
    });

    /** /hapi-service/example/.. Route */
    server.register({
        register: require('./routes/example')
    }, {
        routes: {
            prefix: '/hapi-service/example'
        }
    }, (err) => {
        if (err) {
            console.error('Failed to load the example routes:', err);
        }
    });

    // test route
    server.route({
        method: 'GET',
        path: '/hello',
        handler: function(request, reply) {
            let log = new Logs.Log(request.path, request.id);
            server.log(['hapiService', '/hello'], JSON.stringify(log));
            return reply('hello world');
        }
    });

    return server;
}


module.exports = {
    createServer: createServer
}
