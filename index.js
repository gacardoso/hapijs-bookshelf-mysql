'use strict';

let Joi = require('joi');
let Hapi = require('hapi');
let User = require('./models/user')
let jwt = require('jsonwebtoken');
let Boom = require('boom');

// let server = new Hapi.Server({
//     debug: {
//         request: ['error']
//     }
// });

let server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

const JWT_KEY = 'here be dragons';

//plugin
// server.register(require('hapi-auth-jwt2'), (err) => {

//     if (err) throw err;

//     function validate(jwt, request, cb) {
//         User.forge({ id: jwt.id })
//             .fetch()
//             .then((user) => {
//                 if (user) {
//                     //chave pra ser usada nos controladores
//                     cb(null, true, user.toJSON())
//                 } else {
//                     cb(null, false)
//                 }
//             })
//             .catch((erro) => cb(err));
//     }

//     server.auth.strategy('jwt', 'jwt', {
//         Key: JWT_KEY,
//         validateFunc: validate
//     })
// })

server.register(require('hapi-auth-jwt2'), function (err) {

    if (err) {
        console.log(err);
        throw err;
    }

    let validate = function (jwt, request, cb) {

        console.log(jwt.id);

        User.forge({ id: jwt.id })
            .fetch()
            .then((user) => {
                if (user) {
                    //chave pra ser usada nos controladores
                    cb(null, true, user.toJSON())
                } else {
                    cb(null, false)
                }
            })
            .catch((erro) => cb(err));
    }

    server.auth.strategy('jwt', 'jwt',
        {
            key: JWT_KEY,          // Never Share your secret key
            validateFunc: validate            // validate function defined above
            //,verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
        });

    //valida todas as rotas
    //server.auth.default('jwt');

});





server.route({
    method: 'POST',
    path: '/v1/users',
    handler: function (request, reply) {
        console.log(request.payload);
        User.forge(request.payload)
            .save()
            .then((user) => reply(user), (err) => reply(err))
    },
    config: {
        validate: {
            payload: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            })
        }
    }
});

server.route({
    method: 'POST',
    path: '/v1/sessions',
    handler: function (request, reply) {

        let user;

        User.forge({ email: request.payload.email })
            .fetch({ require: true })
            .then((result) => {
                user = result
                return result.compare(request.payload.password)
            })
            .then((isValid) => {

                if (isValid) {
                    reply({
                        token: jwt.sign({ id: user.id }, JWT_KEY)
                    })
                } else {
                    reply(Boom.unauthorized())
                }
            })
    },
    config: {
        validate: {
            payload: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            })
        }
    }
});

server.route({
    method: 'GET',
    path: '/v1/sessions',
    handler: (request, reply) => {
        reply(request.auth.credentials);
    },
    config: {
        auth: 'jwt'
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});