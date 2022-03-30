import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import DetalleFactura from './DetalleFactura'
import TipoPlatillo from './TipoPlatillo'

export default class Platillo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public precio: number

  @column()
  public tipo_plato: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>TipoPlatillo,{
    foreignKey: 'tipo_plato'
  })
  public cargos: BelongsTo<typeof TipoPlatillo>

  @hasMany(()=>DetalleFactura,{
    foreignKey: 'id_platillo',
    localKey: 'id'
  })
  public plato_platillo: HasMany<typeof DetalleFactura>
}