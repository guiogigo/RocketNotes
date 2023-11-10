const knex = require("../database/knex");//Importando o knex para o projeto

class NotesController {
  async create(request, response) {
    const {title, description, tags, links} = request.body;
    const {user_id} = request.params;

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    });

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex("links").insert(linksInsert);//Insere os links na tabela de links

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsInsert);//Insere as tags na tabela de tags

    response.json();
  }

  async show(request, response) {
    const {id} = request.params;
    const note = await knex("notes").where({id}).first();//Seleciona a primeira nota do id que foi passado
    const tags = await knex("tags").where({note_id: id}).orderBy("name");//Procura as tags vinculadas aquela nota por ordem de nome
    const links = await knex("links").where({note_id: id}).orderBy("created_at");//Procura os links vinculados aquela nota por ordem de criação

    return response.json({
      ...note,
      tags,
      links
    });
  }

  async delete(request, response) {
    const {id} = request.params;

    await knex("notes").where({id}).delete();//Deleta a nota que aquele id possui

    return response.json();
  }

  async index(request, response) {
    const {title, user_id, tags} = request.query;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());//Transforma as tags passadas em um vetor

      notes = await knex("tags")
      .select([
        "notes.id",
        "notes.title",
        "notes.user_id",
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.title", `%${title}%`)
      .whereIn("name", filterTags)
      .innerJoin("notes", "notes.id", "tags.notes_id")
      .orderBy("notes.title")

    }else {
      notes = await knex("notes")
      .where({user_id})
      .whereLike("title", `%${title}%`)//Busca valores que façam parte de algo
      .orderBy("title");
    }

    const userTags = await knex("tags").where({user_id});
    const notesWithTags = notes.mao(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    });

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;