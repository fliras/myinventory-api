import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary();
    table.string('name', 60).notNullable();
    table.string('username', 60).notNullable().unique();
    table.specificType('password', 'char(60)').notNullable();
    table.enum('status', ['ACTIVE', 'INACTIVE', 'DELETED']).notNullable();
    table.timestamps(true, true);
    table.enum('role', ['ADMIN', 'OPERATOR']).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}
