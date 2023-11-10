
const {Router} = require("express");

const TagsController = require("../controllers/TagsController");//Importando o controller da rota

const tagsRoutes = Router();

const tagsController = new TagsController();//Alocando espaço na memória para a classe UsersController

tagsRoutes.get("/:user_id", tagsController.index);//Utiliza o get para rodar o metodo index do Controller e exibir todas as notas do usuário


module.exports = tagsRoutes;//Exportando o arquivo para quem quiser utilizar