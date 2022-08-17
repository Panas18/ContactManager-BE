import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("contact", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("middle_name");
    table.string("last_name").notNullable();
    table.string("work");
    table.string("home");
    table.string("mobile");
    table.string("email");
    table.string("company");
    table.string("photo");
    table.boolean("is_favourite").defaultTo(false);
    table.integer("user_account_id").unsigned().notNullable();
    table
      .foreign("user_account_id")
      .references("user_id")
      .inTable("user_account")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("contact");
}
