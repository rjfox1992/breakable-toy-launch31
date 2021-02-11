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
        relation: Model.ManyToManyRelation,
        modelClass: BookFavorites,
        join: {
          from: "books.id",
          through: {
            from: "bookFavorites.bookListId",
            to: "bookFavorites.bookId",
          },
          to: "bookLists.id",
        },
      },
    };
  }
}
module.exports = Book;
