const sqliteConnection = require('../../sqlite');//Importando a conexão com sqlite
const createUsers = require("./createUsers");//Importando o criador de tabelas de usuário

async function migrationsRun() {
  const schemas = [
    createUsers
  ].join('');

  sqliteConnection().then(db => db.exec(schemas)).catch(error => console.error(error));
}

module.exports = migrationsRun;