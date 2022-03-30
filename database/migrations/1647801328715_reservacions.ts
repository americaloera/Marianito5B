import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reservacions extends BaseSchema {
  protected tableName = 'reservacions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('fecha').notNullable()
      table.integer('id_cliente').unsigned().references('id').inTable('clientes').notNullable()
      table.integer('id_mesa').unsigned().references('id').inTable('mesas').notNullable()

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
