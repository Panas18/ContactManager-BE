import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_account", (table) => {
    table.increments("user_id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("photo");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_account");
}
