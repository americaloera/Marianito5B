import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Mesa from './Mesa'
import Cliente from './Cliente'

export default class Reservacion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha: Date

  @column()
  public id_cliente: number

  @column()
  public id_mesa: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Mesa,{
    foreignKey: 'id_mesa'
  })
  public res_mesa: BelongsTo<typeof Mesa>

  @belongsTo(()=>Cliente,{
    foreignKey: 'id_cliente'
  })
  public res_cliente: BelongsTo<typeof Cliente>
}
