
const {Router} = require("express");

const NotesController = require("../controllers/NotesController");//Importando o controller da rota

const notesRoutes = Router();

const notesController = new NotesController();//Alocando espaço na memória para a classe UsersController

notesRoutes.post("/:user_id", notesController.create);//Roda o middleware e depois o create no usersController
notesRoutes.get("/:id", notesController.show);//Utiliza o show do Controller no método get para mostrar as informações das notas
notesRoutes.delete("/:id", notesController.delete);//Utiliza o delete do Controller no método delete para deletar uma nota com seus tags e links
notesRoutes.get("/", notesController.index);//Utiliza o get para rodar o metodo index do Controller e exibir todas as notas do usuário


module.exports = notesRoutes;//Exportando o arquivo para quem quiser utilizar