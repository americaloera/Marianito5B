import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Platillos extends BaseSchema {
  protected tableName = 'platillos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 255).notNullable()
      table.float('precio').notNullable()
      table.integer('tipo_plato').unsigned().references('id').inTable('tipo_platillos').notNullable().onDelete('CASCADE')

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
