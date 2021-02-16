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
        author: { type: "string", minLength: 1 },
        userId: { type: ["integer, string"] },
      },
    };
  }

  static get relationMappings() {
    const { BookList, BookFavorites, User } = require("./index.js");

    return {
      bookLists: {
        relation: Model.ManyToManyRelation,
        modelClass: BookList,
        join: {
          from: "books.id",
          through: {
            from: "bookFavorites.bookId",
            to: "bookFavorites.bookListId",
          },
          to: "bookLists.id",
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
      bookFavorites: {
        relation: Model.HasManyRelation,
        modelClass: BookFavorites,
        join: {
          from: "books.id",
          to: "bookFavorites.bookId",
        },
      },
    };
  }
}
module.exports = Book;
