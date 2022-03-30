import { Schema, model } from "@ioc:Mongoose";

export default model('OcupacionMesas', new Schema
({
    num_mesa: Number,
    idMesa: Number,
    usuario: Number,
    ocupado: Boolean,
    fecha: String
}))
