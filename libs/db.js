'use strict'

let knexfile = require('../knexfile');
let knex = require('knex')(knexfile[process.env.NODE_ENV || 'development']);
let bookshelf = require('bookshelf')(knex);
let bookshelfUuid = require('bookshelf-uuid');

bookshelf.plugin(bookshelfUuid);

module.exports = bookshelf;