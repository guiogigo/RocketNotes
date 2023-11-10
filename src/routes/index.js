const {Router} = require("express");

const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");

const routes = Router();

routes.use("/users", usersRouter);//Sempre que alguém acessar a rota /users ela vai acessar o grupo de rotas do usuário
routes.use("/notes", notesRouter);//Sempre que alguém acessar a rota /users ela vai acessar o grupo de rotas do usuário
routes.use("/tags", tagsRouter);//Sempre que alguém acessar a rota /tags ela vai acessar o grupo de rotas do usuário

module.exports = routes;//Exporta o conjunto dos grupos de rotas