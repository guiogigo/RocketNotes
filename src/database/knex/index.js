const config = require("../../../knexfile");//Importa as configuração do Knex
const knex = require("knex");//Importa o próprio knex

const connection = knex(config.development);

module.exports = connection;