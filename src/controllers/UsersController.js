const {hash, compare} = require("bcryptjs");//Importa o sistema de criptografia de senhas
const AppError = require("../utils/AppError");//Importa o sistema para teste de erros
const sqliteConnection = require("../database/sqlite");

class UsersController {
 /*
    * index - GET para listar vários registros
    * show - GET para exibir um registro específico
    * create - POST para criar um registro
    * update - PUT para atualizar um registro
    * delete - DELETE para remover um registro
 */
  async create(request, response) {
    const {name, email, password} = request.body;//Retira informações direto da requisição enviada pelo usuário

    const database = await sqliteConnection();//Se conecta com o banco de dados
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);//Checa se existe algum email já cadastrado no banco de dados

    if(checkUserExists) {
      throw new AppError("Este email já está em uso");
    }

    const hashedPassword = await hash(password, 8);//Borrando a senha do usuário

    await database.run("INSERT INTO users (name, email, password) VALUES(?, ?, ?)", [name, email, hashedPassword]);

    return response.status(201).json();
    
  }

  async update(request, response) {
    const {name, email, password, old_password} = request.body;//Recebe as informações da requisição
    const {id} = request.params;//Recebe o id como parâmetro na URL

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);//Seleciona a tabela que pertence ao usuário

    if(!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    //?? é o nullish operator, se o primeiro valor for null ele usa o segundo valor

    if(password && !old_password) {
      throw new AppError("Você precisa informar a sua senha antiga para definir uma nova senha");
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?;
    `, [user.name, user.email, user.password, id]);//Atualizando todas as informações que o usuário enviou

    return response.status(200).json();
  }

  

}//Utilizar a classe para poder acessar várias funções, no máximo 5 funções por classe(Boa prática)

module.exports = UsersController;//Exporta a classe para o resto do projeto