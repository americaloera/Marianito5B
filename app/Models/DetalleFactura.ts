import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Factura from './Factura'
import Platillo from './Platillo'

export default class DetalleFactura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_factura: number

  @column()
  public id_platillo: number

  @column()
  public cantidad: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Factura,{
    foreignKey: 'id_factura'
  })
  public detalle: BelongsTo<typeof Factura>

  @belongsTo(()=>Platillo,{
    foreignKey: 'id_platillo'
  })
  public plato: BelongsTo<typeof Platillo>
}
