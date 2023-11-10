const sqlite3 = require("sqlite3");//Importando o sqlite3 no projeto | Estabelece a comunicação de fato
const sqlite = require("sqlite");//Importando o sqlite no projeto | Responsavel por comunicar
const path = require("path");//O path é uma biblioteca do node que resolve problemas de diretório

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })

  return database;
};//Cria o banco de dados caso ele não exista

module.exports = sqliteConnection;