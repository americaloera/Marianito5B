import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import DetalleFactura from './DetalleFactura'
import Cliente from './Cliente'

export default class Factura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_cliente: number

  @column()
  public id_empleado: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>User,{
    foreignKey: 'id_empleado'
  })
  public factura_empleado: BelongsTo<typeof User>

  @belongsTo(()=>Cliente,{
    foreignKey: 'id_cliente'
  })
  public factura_cliente: BelongsTo<typeof Cliente>

  @hasMany(()=>DetalleFactura,{
    foreignKey: 'id_factura',
    localKey: 'id'
  })
  public detalle: HasMany<typeof DetalleFactura>
}
