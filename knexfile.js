const path = require("path");

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")//Encontra o arquivo do banco de dados que ele irá acessar
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)//Habilita a deleção em cascata do itens do banco de dados
    },
    useNullAsDefault: true,//Configuração extra padrão
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")//Encontra a pasta de migrations para criar as tables nela
    }
  }
};
