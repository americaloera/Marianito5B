import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Facturas extends BaseSchema {
  protected tableName = 'facturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_cliente').unsigned().references('id').inTable('clientes').notNullable().onDelete('CASCADE')
      table.integer('id_empleado').unsigned().references('id').inTable('users').notNullable().onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
