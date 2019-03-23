const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/socialmedia');

module.exports = {
    db,
}