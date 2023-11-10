
exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");//Cria uma coluna id
  table.text("url").notNullable();//Cria uma coluna de titulo do tipo texto
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//Criando um campo de tipo inteiro na tabela que faz refência à nota da qual a tag pertence
  table.timestamp("created_at").default(knex.fn.now());//Cria um campo de tempo definido com o tempo atual da criação

  //onDelete("CASCADE"); = Se a nota for deletada todas as tags que pertencem a ela são deletadas também

});//Cria uma tabela chamada notes

exports.down = knex => knex.schema.dropTable("links");

