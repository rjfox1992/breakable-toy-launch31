/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("bookFavorites", (table) => {
    table.bigIncrements("id");
    table.bigInteger("bookId").unsigned().nullable().index().references("books.id");
    table.bigInteger("bookListId").unsigned().nullable().index().references("bookLists.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("bookFavorites");
};
