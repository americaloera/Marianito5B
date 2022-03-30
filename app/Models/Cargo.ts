import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User"

export default class Cargo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>User,{
    foreignKey: 'cargo',
    localKey: 'id'
  })
   public cargos: HasMany<typeof User>
}
