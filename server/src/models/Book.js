const Model = require("./Model");

class Book extends Model {
  static get tableName() {
    return "books";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "author"],
      properties: {
        title: { type: "string", minLength: 1 },
        Author: { type: "string", minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    const { BookList, User } = require("./index.js");

    return {
      bookList: {
        relation: Model.BelongsToOneRelation,
        modelClass: BookList,
        join: {
          from: "books.bookListId",
          to: "booklists.id",
        },
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "books.userId",
          to: "users.id",
        },
      },
    };
  }
}
module.exports = Book;
