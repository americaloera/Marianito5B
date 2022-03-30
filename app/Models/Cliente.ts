import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Reservacion from './Reservacion'
import Factura from './Factura'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public apellidos: string

  @column()
  public telefono: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>Reservacion,{
    foreignKey: 'id_cliente',
    localKey: 'id'
  })
  public res_cliente: HasMany<typeof Reservacion>

  @hasMany(()=>Factura,{
    foreignKey: 'id_cliente',
    localKey: 'id'
  })
  public factura_cliente: HasMany<typeof Factura>
}
