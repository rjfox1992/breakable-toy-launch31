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
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: "bookFavorites.bookId",
          to: "books.id",
        },
      },

      bookLists: {
        relation: Model.BelongsToOneRelation,
        modelClass: BookList,
        join: {
          from: "bookFavorites.bookListId",
          to: "bookLists.id",
        },
      },
    };
  }
}
module.exports = BookFavorites;
