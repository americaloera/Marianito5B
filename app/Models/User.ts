import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Cargo from './Cargo'
import Factura from './Factura'
//import Cargo from 'App/Models/Cargo'

//
//import Cargo from 'App/Models/Cargo'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  /*
  @column()
  public nombre: string

  @column()
  public apellidos: string

  @column()
  public telefono: string
  */

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public cargo: Number

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @belongsTo(()=>Cargo,{
    foreignKey: 'cargo'
  })
  public cargos: BelongsTo<typeof Cargo>

  @hasMany(()=>Factura,{
    foreignKey: 'id_empleado',
    localKey: 'id'
  })
  public user_factura: HasMany<typeof Factura>
}
