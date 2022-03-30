import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Platillo from 'App/Models/Platillo'

export default class TipoPlatillo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>Platillo,{
    foreignKey: 'tipo_plato',
    localKey: 'id'
  })
  public plato_platillo: HasMany<typeof Platillo>
}
