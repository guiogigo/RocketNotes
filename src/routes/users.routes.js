
const {Router} = require("express");

const UsersController = require("../controllers/UsersController");//Importando o controller da rota

const usersRoutes = Router();

/*MIDDLEWARE
function myMiddleware(request, response, next) {
  console.log("Você passou pelo middleware");
  if(!request.body.isAdmin) {
    return response.json({message: "User unauthorized"});//Se o usuário não for admin ele não segue com a requisição
  }
  next();
}//Função middleware*/

const usersController = new UsersController();//Alocando espaço na memória para a classe UsersController


/*MÉTODO GET
app.get("/:id/:user", (request, response) => {
  const {id, user} = request.params; //Desestruturação o id e user do request.params
  //:id é um parâmetro do request
  response.send(`
    Seu ID é: ${id}.
    Para o usuário: ${user}.
  `);
}); //Utiliza o método GET para receber um request e enviar um response

app.get("/users", (request, response) => {
  const {page, limit} = request.query;
   //page e limit não são parametros obrigatórios do request
  response.send(`
    Página: ${page}.
    Mostrar: ${limit}.
  `);
});*/
/*METODO POST
usersRoutes.post("/", (request, response) => {
  const {name, email, password} = request.body;//Retira informações direto da requisição enviada pelo usuário

  response.send(`Usuário: ${name}, Email: ${email} e Senha: ${password}`);
});//Utiliza o método post para receber um arquivo .JSON e retornar informações tiradas dele*/


usersRoutes.post("/", usersController.create);//Roda o middleware e depois o create no usersController
usersRoutes.put("/:id", usersController.update);//Roda o update quando a URL tiver um parâmetro de id na frente

module.exports = usersRoutes;//Exportando o arquivo para quem quiser utilizar