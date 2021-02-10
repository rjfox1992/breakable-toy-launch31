/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("bookLists", (table) => {
    table.bigInteger("bookId").notNullable().index().unsigned().references("books.id");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("bookLists", (table) => {
    table.dropColumn("bookId");
  });
};
