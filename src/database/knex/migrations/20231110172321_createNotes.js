
exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");//Cria uma coluna id
  table.text("title");//Cria uma coluna de titulo do tipo texto
  table.text("description");//Cria uma coluna de descrição do tipo texto
  table.integer("user_id").references("id").inTable("users");//Criando um campo do tipo inteiro na tabela que faz referência ao id da tabela do usuário;
  table.timestamp("created_at").default(knex.fn.now());//Cria um campo de tempo definido com o tempo atual da criação
  table.timestamp("updated_at").default(knex.fn.now());//Cria um campo de tempo definido com o tempo atual da criação

});//Cria uma tabela chamada notes

exports.down = knex => knex.schema.dropTable("notes");

