const Model = require("./Model");

class BookList extends Model {
  static get tableName() {
    return "bookLists";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minlength: 1 },
        imageUrl: { type: "string" },
        userId: { type: ["string, integer"] },
      },
    };
  }

  static get relationMappings() {
    const { User } = require("./index.js");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "bookLists.userId",
          to: "users.id",
        },
      },
    };
  }
}
module.exports = BookList;
