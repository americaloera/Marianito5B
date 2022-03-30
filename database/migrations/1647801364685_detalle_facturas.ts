import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DetalleFacturas extends BaseSchema {
  protected tableName = 'detalle_facturas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_factura').unsigned().references('id').inTable('facturas').notNullable().onDelete('CASCADE')
      table.integer('id_platillo').unsigned().references('id').inTable('platillos').notNullable().onDelete('CASCADE')
      table.integer('cantidad').notNullable()

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
