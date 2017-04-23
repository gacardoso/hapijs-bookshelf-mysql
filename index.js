'use strict';

let Hapi = require('hapi');
let User = require('./models/user')
let server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' });

server.route({
    method: 'POST',
    path: '/v1/users',
    handler: function (request, reply) {
        console.log(request.payload);
        User.forge(request.payload)
        .save()
        .then((user) => reply(user) )
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});