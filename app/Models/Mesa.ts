import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Reservacion from './Reservacion'

export default class Mesa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public num_mesa: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>Reservacion,{
    foreignKey: 'id_mesa',
    localKey: 'id'
  })
  public res_mesa: HasMany<typeof Reservacion>
}
