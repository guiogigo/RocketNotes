
exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");//Cria uma coluna id
  table.text("name").notNullable();//Cria uma coluna de titulo do tipo texto
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//Criando um campo de tipo inteiro na tabela que faz refência à nota da qual a tag pertence
  table.integer("user_id").references("id").inTable("users");//Criando um campo do tipo inteiro na tabela que faz referência ao id da tabela do usuário;

  //onDelete("CASCADE"); = Se a nota for deletada todas as tags que pertencem a ela são deletadas também

});//Cria uma tabela chamada notes

exports.down = knex => knex.schema.dropTable("tags");
