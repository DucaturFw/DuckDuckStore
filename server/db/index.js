// Postgres
const pg = require('../config/db');
const oracles = require('./mock');
const pgp = require('pg-promise')();
const db = pgp(pg);

module.exports = {
  create: function({ title, description, email }) {
    return new Promise((resolve, reject) => {
      db
        .one('INSERT INTO oracles (title, description, email) VALUES ($1, $2, $3) RETURNING id', [
          title,
          description,
          email
        ])
        .then(({ id }) => {
          resolve(id);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  get: function(id) {
    return oracles.filter(x => x.id == id)[0];
  },
  all: function() {
    return oracles;
  }
};