'use strict'; 

module.exports = {

  development: {
    client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'demo',
            password: 'demo',
            database: 'demo',
            charset: 'utf8',
        }
  },

  debug: true
  
};
