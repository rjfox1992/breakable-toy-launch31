/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("books", (table) => {
    table.bigIncrements("id").primary();
    table.string("title").notNullable();
    table.string("author");
    table.bigInteger("bookListId").unsigned().nullable().index().references("bookLists.id");
    table.bigInteger("userId").notNullable().index().unsigned().references("users.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("books");
};
