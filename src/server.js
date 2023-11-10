require("express-async-errors");//Importa o módulo de tratamento de erros

const migrationsRun = require("./database/sqlite/migrations");//Importa o banco de dados
const AppError = require("./utils/AppError");//Importa o AppError para analisar erros no processamento
const express = require("express"); //Importa o express para o projeto
const routes = require("./routes");//Não precisa do index.js porque ele sempre carrega o index por padrão
migrationsRun();//Inicia o banco de dados

const app = express(); //Inicia o express no projeto
app.use(express.json());//Informa para o sistema que ele irá receber uma requisição do tipo JSON
app.use(routes);


app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });

});//Recebe o erro e analisa se ele foi causado pelo usuário ou pelo servidor

const PORT = 3333; //Porta onde o Express vai estar ativo
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); //Quando a aplicação iniciar ele roda esse console.log

