const Model = require("./Model");

class BookFavorites extends Model {
  static get tableName() {
    return "bookFavorites";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["bookId", "bookListId"],
      properties: {
        title: { type: "string", minLength: 1 },
        Author: { type: "string", minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    const { Book, BookList } = require("./index.js");

    return {
      books: {
        relation: Model.HasManyRelation,
        modelClass: Book,
        join: {
          from: "books.id",
          to: "bookFavorites.bookId",
        },
      },

      bookLists: {
        relation: Model.HasManyRelation,
        modelClass: BookList,
        join: {
          from: "bookLists.id",
          to: "bookFavorites.bookListId",
        },
      },
    };
  }
}
module.exports = BookFavorites;
