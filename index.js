'use strict';

let Joi = require('joi');
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
        .then((user) => reply(user), (err) => reply(err) )
    },
    config:{
        validate:{
            payload: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            })
        }
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});